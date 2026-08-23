import assert from 'node:assert/strict'
import test from 'node:test'
import {
  MAX_BODY_BYTES,
  createResendPayload,
  isAllowedOrigin,
  parseContactPayload,
  readRequestBody,
} from '../test-dist/contact.js'

test('accepts and trims valid contact data', () => {
  const result = parseContactPayload({
    name: '  Alice Chen  ',
    email: '  alice@example.com  ',
    message: '  Hi Kyra  ',
    website: '',
  })

  assert.deepEqual(result, {
    kind: 'valid',
    submission: {
      name: 'Alice Chen',
      email: 'alice@example.com',
      message: 'Hi Kyra',
    },
  })
})

test('builds fixed server-controlled Resend fields', () => {
  const payload = createResendPayload(
    { name: 'Alice Chen', email: 'alice@example.com', message: 'Hi Kyra' },
    'contact@jqiwen.com',
    'kyraoaij@gmail.com',
  )

  assert.deepEqual(payload, {
    from: 'Portfolio Message <contact@jqiwen.com>',
    to: ['kyraoaij@gmail.com'],
    reply_to: 'alice@example.com',
    subject: 'Message from personal website - Alice Chen',
    text: 'Hi Kyra\n\nSender email: alice@example.com',
  })
  assert.equal('cc' in payload, false)
  assert.equal('bcc' in payload, false)
  assert.equal('html' in payload, false)
})

test('rejects malformed types, header injection, and browser-controlled email fields', () => {
  assert.deepEqual(
    parseContactPayload({ name: ['Alice'], email: 'alice@example.com', message: 'Hello' }),
    { kind: 'invalid' },
  )
  assert.deepEqual(
    parseContactPayload({ name: 'Alice\r\nBcc: target@example.com', email: 'alice@example.com', message: 'Hello' }),
    { kind: 'invalid' },
  )
  assert.deepEqual(
    parseContactPayload({
      name: 'Alice',
      email: 'alice@example.com',
      message: 'Hello',
      to: 'attacker@example.com',
    }),
    { kind: 'invalid' },
  )
})

test('silently classifies a filled honeypot as a bot', () => {
  assert.deepEqual(
    parseContactPayload({ name: '', email: '', message: '', website: 'https://spam.example' }),
    { kind: 'bot' },
  )
})

test('enforces the request body size limit while streaming', async () => {
  const request = new Request('https://jqiwen.com/api/contact', {
    method: 'POST',
    body: 'x'.repeat(MAX_BODY_BYTES + 1),
  })

  assert.deepEqual(await readRequestBody(request), { kind: 'too-large' })
})

test('allows only the production site and known local development origins', () => {
  assert.equal(isAllowedOrigin('https://jqiwen.com'), true)
  assert.equal(isAllowedOrigin('http://localhost:5173'), true)
  assert.equal(isAllowedOrigin('https://malicious.example'), false)
  assert.equal(isAllowedOrigin(null), true)
})
