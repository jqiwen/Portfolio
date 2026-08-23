import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react'

import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Pin,
  Send,
} from 'lucide-react'

import { profile } from '../data/profile'

type FieldName = 'name' | 'email' | 'message'

type FieldErrors = Partial<
  Record<FieldName, string>
>

type SubmitStatus =
  | 'idle'
  | 'sending'
  | 'success'
  | 'error'

type FormValues = {
  name: string
  email: string
  message: string
}

const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const contactDetails = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: 'LinkedIn',
    value: profile.linkedin
      .replace(/^https?:\/\/(www\.)?/, '')
      .replace(/\/$/, ''),
    href: profile.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: 'GitHub',
    value: profile.github
      .replace(/^https?:\/\/(www\.)?/, '')
      .replace(/\/$/, ''),
    href: profile.github,
    icon: Github,
    external: true,
  },
    {
    label: 'Location',
    value: profile.location,
    href: undefined,
    icon: MapPin,
    external: false,
  },
] as const

export function Contact() {
  const [formValues, setFormValues] =
    useState<FormValues>({
      name: '',
      email: '',
      message: '',
    })

  const [fieldErrors, setFieldErrors] =
    useState<FieldErrors>({})

  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>('idle')

  const isSubmittingRef = useRef(false)

  useEffect(() => {
    if (submitStatus !== 'success') {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setSubmitStatus('idle')
    }, 4000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [submitStatus])

  const trimmedName = formValues.name.trim()
  const trimmedEmail = formValues.email.trim()
  const trimmedMessage = formValues.message.trim()

  const isEmailValid =
    trimmedEmail.length > 0 &&
    emailPattern.test(trimmedEmail)

  const isFormReady =
    trimmedName.length > 0 &&
    trimmedName.length <= 80 &&
    isEmailValid &&
    trimmedEmail.length <= 254 &&
    trimmedMessage.length > 0 &&
    trimmedMessage.length <= 3000

  const showEmailWarning =
    trimmedEmail.length > 0 && !isEmailValid

  const updateField = (
    field: FieldName,
    value: string,
  ) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }))

    setFieldErrors((current) => {
      if (!current[field]) {
        return current
      }

      const next = { ...current }
      delete next[field]

      return next
    })

    if (submitStatus === 'error') {
      setSubmitStatus('idle')
    }
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (isSubmittingRef.current) {
      return
    }

    if (!isFormReady) {
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)

    const values = {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    }

    const nextErrors: FieldErrors = {}

    if (!values.name) {
      nextErrors.name =
        'Please enter your name.'
    } else if (values.name.length > 80) {
      nextErrors.name =
        'Name must be 80 characters or fewer.'
    }

    if (!values.email) {
      nextErrors.email =
        'Please enter your email.'
    } else if (
      values.email.length > 254
    ) {
      nextErrors.email =
        'Email must be 254 characters or fewer.'
    } else if (
      !emailPattern.test(values.email)
    ) {
      nextErrors.email =
        'Please enter a valid email address.'
    }

    if (!values.message) {
      nextErrors.message =
        'Please enter a message.'
    } else if (
      values.message.length > 3000
    ) {
      nextErrors.message =
        'Message must be 3000 characters or fewer.'
    }

    if (
      Object.keys(nextErrors).length > 0
    ) {
      setFieldErrors(nextErrors)
      setSubmitStatus('idle')

      const firstInvalidField =
        Object.keys(
          nextErrors,
        )[0] as FieldName

      ;(
        form.elements.namedItem(
          firstInvalidField,
        ) as HTMLElement | null
      )?.focus()

      return
    }

    setFieldErrors({})

    isSubmittingRef.current = true
    setSubmitStatus('sending')

    try {
      const response = await fetch(
        '/api/contact',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            ...values,

            website: String(
              formData.get('website') ??
                '',
            ),
          }),
        },
      )

      const result = (await response
        .json()
        .catch(() => null)) as {
        success?: boolean
      } | null

      if (
        !response.ok ||
        result?.success !== true
      ) {
        throw new Error(
          'Message submission failed',
        )
      }

      setFormValues({
        name: '',
        email: '',
        message: '',
      })

      form.reset()

      isSubmittingRef.current = false

      setSubmitStatus('success')
    } catch {
      isSubmittingRef.current = false
      setSubmitStatus('error')
    }
  }

  const isButtonDisabled =
    !isFormReady ||
    submitStatus === 'sending' ||
    submitStatus === 'success'

  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <p className="eyebrow contact-eyebrow">
          <span aria-hidden="true" />
          Contact
        </p>

        <div className="contact-layout">
          {/* LEFT SIDE */}

          <div className="contact-info">
            <h2 id="contact-heading">
              Let’s connect
            </h2>

            <p className="contact-info__intro">
              I’m always open to discussing
              new opportunities and
              interesting ideas. Reach out to
              me:
            </p>

<ul
  className="contact-details"
  aria-label="Contact details"
>
  {contactDetails.map(
    ({
      label,
      value,
      href,
      icon: Icon,
      external,
    }) => (
      <li key={label}>
        <Icon
          className="contact-details__icon"
          aria-hidden="true"
          size={17}
          strokeWidth={1.8}
        />

        {href ? (
          <a
            className="contact-details__link"
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            aria-label={`${label}: ${value}`}
          >
            <span className="contact-details__value">
              {value}
            </span>

            <ExternalLink
              className="contact-details__external"
              aria-hidden="true"
              size={15}
              strokeWidth={1.8}
            />
          </a>
        ) : (
          <div className="contact-details__plain">
            <span className="contact-details__value">
              {value}
            </span>
          </div>
        )}
      </li>
    ),
  )}
</ul>
          </div>

          {/* CONTACT FORM */}

          <form
            className={`contact-form${
              submitStatus === 'success'
                ? ' contact-form--success'
                : ''
            }`}
            action="/api/contact"
            method="POST"
            noValidate
            onSubmit={handleSubmit}
          >
            {/* Leave a Note */}

            <div className="contact-form__note-header">
              <span
                className="contact-form__pin"
                aria-hidden="true"
              >
                <Pin
                  size={18}
                  strokeWidth={2}
                />
              </span>

              <div className="contact-form__note-title">
                <h3>Leave a Note</h3>
                <span aria-hidden="true" />
              </div>
            </div>

            {/* NAME + EMAIL */}

            <div className="contact-form__top-row">
              <div className="contact-form__field">
                <label htmlFor="contact-name">
                  Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  maxLength={80}
                  required
                  value={formValues.name}
                  disabled={
                    submitStatus ===
                    'success'
                  }
                  aria-invalid={Boolean(
                    fieldErrors.name,
                  )}
                  aria-describedby={
                    fieldErrors.name
                      ? 'contact-name-error'
                      : undefined
                  }
                  onChange={(event) =>
                    updateField(
                      'name',
                      event.target.value,
                    )
                  }
                />

                {fieldErrors.name && (
                  <span
                    className="contact-form__error"
                    id="contact-name-error"
                  >
                    <AlertCircle
                      aria-hidden="true"
                      size={14}
                    />

                    {fieldErrors.name}
                  </span>
                )}
              </div>

              <div className="contact-form__field">
                <label htmlFor="contact-email">
                  Email
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="e.g. you@email.com"
                  maxLength={254}
                  required
                  value={formValues.email}
                  disabled={
                    submitStatus ===
                    'success'
                  }
                  className={
                    showEmailWarning ||
                    fieldErrors.email
                      ? 'contact-form__input--invalid'
                      : undefined
                  }
                  aria-invalid={
                    showEmailWarning ||
                    Boolean(
                      fieldErrors.email,
                    )
                  }
                  aria-describedby={
                    showEmailWarning ||
                    fieldErrors.email
                      ? 'contact-email-error'
                      : undefined
                  }
                  onChange={(event) =>
                    updateField(
                      'email',
                      event.target.value,
                    )
                  }
                />

                {showEmailWarning &&
                  !fieldErrors.email && (
                    <span
                      className="contact-form__error"
                      id="contact-email-error"
                    >
                      <AlertCircle
                        aria-hidden="true"
                        size={14}
                      />

                      Please enter a valid
                      email address.
                    </span>
                  )}

                {fieldErrors.email && (
                  <span
                    className="contact-form__error"
                    id="contact-email-error"
                  >
                    <AlertCircle
                      aria-hidden="true"
                      size={14}
                    />

                    {fieldErrors.email}
                  </span>
                )}
              </div>
            </div>

            {/* MESSAGE */}

            <div className="contact-form__field">
              <label htmlFor="contact-message">
                Message
              </label>

              <textarea
                id="contact-message"
                name="message"
                placeholder="Leave a message for Kyra..."
                maxLength={3000}
                required
                value={formValues.message}
                disabled={
                  submitStatus === 'success'
                }
                aria-invalid={Boolean(
                  fieldErrors.message,
                )}
                aria-describedby={
                  fieldErrors.message
                    ? 'contact-message-error'
                    : undefined
                }
                onChange={(event) =>
                  updateField(
                    'message',
                    event.target.value,
                  )
                }
              />

              {fieldErrors.message && (
                <span
                  className="contact-form__error"
                  id="contact-message-error"
                >
                  <AlertCircle
                    aria-hidden="true"
                    size={14}
                  />

                  {fieldErrors.message}
                </span>
              )}
            </div>

            {/* HONEYPOT */}

            <input
              className="contact-form__honeypot"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* SEND */}

            <div className="contact-form__actions">
              <button
                className="button contact-form__submit"
                type="submit"
                disabled={isButtonDisabled}
              >
                <span>
                  Send message
                </span>

                <Send
                  aria-hidden="true"
                  size={14}
                />
              </button>

              {submitStatus ===
                'error' && (
                <p
                  className="contact-form__status contact-form__status--error"
                  role="alert"
                >
                  Unable to send your
                  message. Please try again.
                </p>
              )}
            </div>

            {/* SUCCESS */}

            {submitStatus ===
              'success' && (
              <div
                className="contact-form__success"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2
                  aria-hidden="true"
                  size={34}
                  strokeWidth={1.8}
                />

                <p>
                  Message successfully sent
                  to Kyra.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}