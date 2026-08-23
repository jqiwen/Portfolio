import { useEffect, useRef, useState, type FormEvent } from 'react'
import { CheckCircle2, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react'
import { profile } from '../data/profile'

type FieldName = 'name' | 'email' | 'message'
type FieldErrors = Partial<Record<FieldName, string>>
type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const contactDetails = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: 'Location',
    value: profile.location,
    href: undefined,
    icon: MapPin,
    external: false,
  },
  {
    label: 'LinkedIn',
    value: profile.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
    href: profile.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: 'GitHub',
    value: profile.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
    href: profile.github,
    icon: Github,
    external: true,
  },
] as const

export function Contact() {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const isSubmittingRef = useRef(false)

  useEffect(() => {
    if (submitStatus !== 'success') return

    const timeoutId = window.setTimeout(() => {
      setSubmitStatus('idle')
    }, 4000)

    return () => window.clearTimeout(timeoutId)
  }, [submitStatus])

  const clearFieldError = (field: FieldName) => {
    setFieldErrors((current) => {
      if (!current[field]) return current

      const next = { ...current }
      delete next[field]
      return next
    })

    if (submitStatus === 'success' || submitStatus === 'error') {
      setSubmitStatus('idle')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmittingRef.current) return

    const form = event.currentTarget
    const formData = new FormData(form)
    const values = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    }
    const nextErrors: FieldErrors = {}

    if (!values.name) {
      nextErrors.name = 'Please enter your name.'
    } else if (values.name.length > 80) {
      nextErrors.name = 'Name must be 80 characters or fewer.'
    }
    if (!values.email) {
      nextErrors.email = 'Please enter your email.'
    } else if (values.email.length > 254) {
      nextErrors.email = 'Email must be 254 characters or fewer.'
    } else if (!emailPattern.test(values.email)) {
      nextErrors.email = 'Please enter a valid email.'
    }
    if (!values.message) {
      nextErrors.message = 'Please enter a message.'
    } else if (values.message.length > 3000) {
      nextErrors.message = 'Message must be 3000 characters or fewer.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors)
      setSubmitStatus('idle')
      const firstInvalidField = Object.keys(nextErrors)[0] as FieldName
      ;(form.elements.namedItem(firstInvalidField) as HTMLElement | null)?.focus()
      return
    }

    setFieldErrors({})
    isSubmittingRef.current = true
    setSubmitStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          website: String(formData.get('website') ?? ''),
        }),
      })
      const result = (await response.json().catch(() => null)) as { success?: boolean } | null

      if (!response.ok || result?.success !== true) {
        throw new Error('Message submission failed')
      }

      form.reset()
      isSubmittingRef.current = false
      setSubmitStatus('success')
    } catch {
      isSubmittingRef.current = false
      setSubmitStatus('error')
    }
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <p className="eyebrow contact-eyebrow">
          <span aria-hidden="true" />
          Contact
        </p>

        <div className="contact-layout">
          <div className="contact-info">
            <h2 id="contact-heading">Let’s connect</h2>
            <p className="contact-info__intro">
              I’m always open to discussing new opportunities and interesting ideas. Reach out to me:
            </p>

            <ul className="contact-details" aria-label="Contact details">
              {contactDetails.map(({ label, value, href, icon: Icon, external }) => (
                <li key={label}>
                  <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
                  {href ? (
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      aria-label={`${label}: ${value}`}
                    >
                      {value}
                    </a>
                  ) : (
                    <p>{value}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <form
            className={`contact-form${submitStatus === 'success' ? ' contact-form--success' : ''}`}
            action="/api/contact"
            method="POST"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="contact-form__top-row">
              <div className="contact-form__field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your Name"
                  maxLength={80}
                  required
                  disabled={submitStatus === 'success'}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                  onChange={() => clearFieldError('name')}
                />
                {fieldErrors.name && (
                  <span className="contact-form__error" id="contact-name-error">
                    {fieldErrors.name}
                  </span>
                )}
              </div>

              <div className="contact-form__field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="Email"
                  placeholder="Your email"
                  maxLength={254}
                  required
                  disabled={submitStatus === 'success'}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                  onChange={() => clearFieldError('email')}
                />
                {fieldErrors.email && (
                  <span className="contact-form__error" id="contact-email-error">
                    {fieldErrors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Leave a message for Kyra ..."
                maxLength={3000}
                required
                disabled={submitStatus === 'success'}
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                onChange={() => clearFieldError('message')}
              />
              {fieldErrors.message && (
                <span className="contact-form__error" id="contact-message-error">
                  {fieldErrors.message}
                </span>
              )}
            </div>

            <input
              className="contact-form__honeypot"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="contact-form__actions">
              <button
                className="button contact-form__submit"
                type="submit"
                disabled={submitStatus === 'sending' || submitStatus === 'success'}
              >
                <span>{submitStatus === 'sending' ? 'Sending...' : 'Send message'}</span>
                <Send aria-hidden="true" size={14} />
              </button>

              {submitStatus === 'error' && (
                <p className="contact-form__status contact-form__status--error" role="alert">
                  Unable to send your message. Please try again.
                </p>
              )}
            </div>

            {submitStatus === 'success' && (
              <div className="contact-form__success" role="status" aria-live="polite">
                <CheckCircle2 aria-hidden="true" size={34} strokeWidth={1.8} />
                <p>Message successfully sent to Kyra.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
