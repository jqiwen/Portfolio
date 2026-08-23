export const MAX_BODY_BYTES = 12 * 1024

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HEADER_CONTROL_PATTERN = /[\u0000-\u001f\u007f]/
const ALLOWED_FIELDS = new Set(['name', 'email', 'message', 'website'])
const ALLOWED_ORIGINS = new Set([
  'https://jqiwen.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
])

export interface ContactSubmission {
  name: string
  email: string
  message: string
}

export interface ResendEmailPayload {
  from: string
  to: string[]
  reply_to: string
  subject: string
  text: string
}

export type ParsedContactPayload =
  | { kind: 'valid'; submission: ContactSubmission }
  | { kind: 'bot' }
  | { kind: 'invalid' }

export type BodyReadResult =
  | { kind: 'ok'; text: string }
  | { kind: 'too-large' }
  | { kind: 'invalid' }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isReasonableEmail(value: string): boolean {
  return (
    value.length >= 3 &&
    value.length <= 254 &&
    !HEADER_CONTROL_PATTERN.test(value) &&
    EMAIL_PATTERN.test(value)
  )
}

export function parseContactPayload(value: unknown): ParsedContactPayload {
  if (!isRecord(value) || Object.keys(value).some((key) => !ALLOWED_FIELDS.has(key))) {
    return { kind: 'invalid' }
  }

  if (value.website !== undefined && typeof value.website !== 'string') {
    return { kind: 'invalid' }
  }

  if (typeof value.website === 'string' && value.website.trim().length > 0) {
    return { kind: 'bot' }
  }

  if (
    typeof value.name !== 'string' ||
    typeof value.email !== 'string' ||
    typeof value.message !== 'string'
  ) {
    return { kind: 'invalid' }
  }

  const submission = {
    name: value.name.trim(),
    email: value.email.trim(),
    message: value.message.trim(),
  }

  if (
    submission.name.length < 1 ||
    submission.name.length > 80 ||
    HEADER_CONTROL_PATTERN.test(submission.name) ||
    !isReasonableEmail(submission.email) ||
    submission.message.length < 1 ||
    submission.message.length > 3000
  ) {
    return { kind: 'invalid' }
  }

  return { kind: 'valid', submission }
}

export function createResendPayload(
  submission: ContactSubmission,
  fromEmail: string,
  toEmail: string,
): ResendEmailPayload {
  return {
    from: `Portfolio Message <${fromEmail}>`,
    to: [toEmail],
    reply_to: submission.email,
    subject: `Personal Website Message from - ${submission.name}`,
    text: `${submission.message}\n\nSender email: ${submission.email}`,
  }
}

export function isAllowedOrigin(origin: string | null): boolean {
  return origin === null || ALLOWED_ORIGINS.has(origin)
}

export async function readRequestBody(
  request: Request,
  maxBytes = MAX_BODY_BYTES,
): Promise<BodyReadResult> {
  const contentLengthHeader = request.headers.get('content-length')

  if (contentLengthHeader !== null) {
    const contentLength = Number(contentLengthHeader)

    if (!Number.isSafeInteger(contentLength) || contentLength < 0) {
      return { kind: 'invalid' }
    }

    if (contentLength > maxBytes) {
      return { kind: 'too-large' }
    }
  }

  if (request.body === null) {
    return { kind: 'ok', text: '' }
  }

  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let totalBytes = 0

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      totalBytes += value.byteLength
      if (totalBytes > maxBytes) {
        await reader.cancel()
        return { kind: 'too-large' }
      }

      chunks.push(value)
    }

    const body = new Uint8Array(totalBytes)
    let offset = 0

    for (const chunk of chunks) {
      body.set(chunk, offset)
      offset += chunk.byteLength
    }

    return {
      kind: 'ok',
      text: new TextDecoder('utf-8', { fatal: true }).decode(body),
    }
  } catch {
    return { kind: 'invalid' }
  }
}
