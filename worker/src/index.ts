import { DurableObject } from 'cloudflare:workers'
import {
  createResendPayload,
  isAllowedOrigin,
  isReasonableEmail,
  parseContactPayload,
  readRequestBody,
} from './contact'

const CONTACT_PATH = '/api/contact'
const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5

interface RateLimitRow {
  window_start: number
  request_count: number
}

interface RateLimitResult {
  allowed: boolean
  retryAfterSeconds: number
}

interface ResendResponse {
  id?: unknown
}

export class ContactRateLimiter extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)
    this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS rate_limit (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        window_start INTEGER NOT NULL,
        request_count INTEGER NOT NULL
      )
    `)
  }

  check(now = Date.now()): RateLimitResult {
    const current = this.ctx.storage.sql
      .exec('SELECT window_start, request_count FROM rate_limit WHERE id = 1')
      .toArray()[0] as unknown as RateLimitRow | undefined

    if (!current || now - current.window_start >= RATE_LIMIT_WINDOW_MS) {
      this.ctx.storage.sql.exec(
        `INSERT INTO rate_limit (id, window_start, request_count)
         VALUES (1, ?, 1)
         ON CONFLICT(id) DO UPDATE SET window_start = excluded.window_start, request_count = 1`,
        now,
      )
      return { allowed: true, retryAfterSeconds: 0 }
    }

    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((current.window_start + RATE_LIMIT_WINDOW_MS - now) / 1000),
    )

    if (current.request_count >= RATE_LIMIT_MAX_REQUESTS) {
      return { allowed: false, retryAfterSeconds }
    }

    this.ctx.storage.sql.exec(
      'UPDATE rate_limit SET request_count = request_count + 1 WHERE id = 1',
    )
    return { allowed: true, retryAfterSeconds: 0 }
  }
}

function responseHeaders(origin: string | null): Headers {
  const headers = new Headers({
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  })

  if (origin !== null && isAllowedOrigin(origin)) {
    headers.set('Access-Control-Allow-Origin', origin)
    headers.set('Vary', 'Origin')
  }

  return headers
}

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  origin: string | null,
  extraHeaders?: Record<string, string>,
): Response {
  const headers = responseHeaders(origin)

  for (const [name, value] of Object.entries(extraHeaders ?? {})) {
    headers.set(name, value)
  }

  return Response.json(body, { status, headers })
}

function logEvent(event: string, details: Record<string, unknown> = {}): void {
  console.log(
    JSON.stringify({
      event,
      timestamp: new Date().toISOString(),
      ...details,
    }),
  )
}

async function createRateLimitKey(request: Request): Promise<string> {
  const clientIp = request.headers.get('CF-Connecting-IP') ?? 'local-development'
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(clientIp))

  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function hasValidServerConfiguration(env: Env): boolean {
  return (
    typeof env.RESEND_API_KEY === 'string' &&
    env.RESEND_API_KEY.length > 0 &&
    isReasonableEmail(env.CONTACT_FROM_EMAIL) &&
    isReasonableEmail(env.CONTACT_TO_EMAIL)
  )
}

async function handleContactRequest(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get('Origin')

  if (!isAllowedOrigin(origin)) {
    logEvent('contact_origin_rejected')
    return jsonResponse({ success: false, error: 'Request rejected.' }, 403, null)
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Origin': origin ?? 'https://jqiwen.com',
        'Access-Control-Max-Age': '86400',
        Vary: 'Origin',
      },
    })
  }

  if (request.method !== 'POST') {
    return jsonResponse(
      { success: false, error: 'Method not allowed.' },
      405,
      origin,
      { Allow: 'POST, OPTIONS' },
    )
  }

  const contentType = request.headers.get('Content-Type')?.split(';', 1)[0].trim().toLowerCase()
  if (contentType !== 'application/json') {
    return jsonResponse(
      { success: false, error: 'Unsupported media type.' },
      415,
      origin,
    )
  }

  const bodyResult = await readRequestBody(request)
  if (bodyResult.kind === 'too-large') {
    logEvent('contact_payload_too_large')
    return jsonResponse({ success: false, error: 'Payload too large.' }, 413, origin)
  }
  if (bodyResult.kind === 'invalid') {
    logEvent('contact_body_read_failed')
    return jsonResponse({ success: false, error: 'Invalid form data.' }, 400, origin)
  }

  let rawPayload: unknown
  try {
    rawPayload = JSON.parse(bodyResult.text)
  } catch {
    logEvent('contact_json_invalid')
    return jsonResponse({ success: false, error: 'Invalid form data.' }, 400, origin)
  }

  const parsedPayload = parseContactPayload(rawPayload)

  if (parsedPayload.kind === 'bot') {
    logEvent('contact_honeypot_discarded')
    return jsonResponse({ success: true }, 200, origin)
  }

  let rateLimit: RateLimitResult
  try {
    const rateLimitKey = await createRateLimitKey(request)
    rateLimit = await env.CONTACT_RATE_LIMITER.getByName(rateLimitKey).check()
  } catch {
    logEvent('contact_rate_limiter_failed')
    return jsonResponse({ success: false, error: 'Unable to send message.' }, 503, origin)
  }

  if (!rateLimit.allowed) {
    logEvent('contact_rate_limited')
    return jsonResponse(
      { success: false, error: 'Too many requests.' },
      429,
      origin,
      { 'Retry-After': String(rateLimit.retryAfterSeconds) },
    )
  }

  if (parsedPayload.kind !== 'valid') {
    logEvent('contact_validation_failed')
    return jsonResponse({ success: false, error: 'Invalid form data.' }, 400, origin)
  }

  if (!hasValidServerConfiguration(env)) {
    logEvent('contact_server_configuration_invalid')
    return jsonResponse({ success: false, error: 'Unable to send message.' }, 500, origin)
  }

  const emailPayload = createResendPayload(
    parsedPayload.submission,
    env.CONTACT_FROM_EMAIL,
    env.CONTACT_TO_EMAIL,
  )

  try {
    const resendResponse = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    })
    const resendResult = (await resendResponse.json().catch(() => null)) as ResendResponse | null

    if (!resendResponse.ok || typeof resendResult?.id !== 'string') {
      logEvent('contact_resend_failed', { providerStatus: resendResponse.status })
      return jsonResponse({ success: false, error: 'Unable to send message.' }, 502, origin)
    }

    logEvent('contact_request_succeeded', { resendRequestId: resendResult.id })
    return jsonResponse({ success: true }, 200, origin)
  } catch {
    logEvent('contact_resend_request_failed')
    return jsonResponse({ success: false, error: 'Unable to send message.' }, 502, origin)
  }
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname !== CONTACT_PATH) {
      return jsonResponse({ success: false, error: 'Not found.' }, 404, request.headers.get('Origin'))
    }

    return handleContactRequest(request, env)
  },
} satisfies ExportedHandler<Env>
