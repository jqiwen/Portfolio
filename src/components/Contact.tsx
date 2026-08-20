import { ArrowUpRight, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/profile'

const contactLinks = [
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
  { label: 'GitHub', href: profile.github, icon: Github },
  { label: 'Resume', href: profile.resume, icon: FileText },
]

export function Contact() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-panel">
          <div>
            <p className="eyebrow eyebrow--light">Get in touch</p>
            <h2 id="contact-heading">Let’s connect.</h2>
          </div>
          <div className="contact-panel__copy">
            <p>
              I’m interested in software engineering opportunities where I can work on practical products, scalable frontend systems, and full-stack applications.
            </p>
            <div className="contact-links">
              {contactLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                >
                  <Icon aria-hidden="true" size={17} />
                  {label}
                  <ArrowUpRight aria-hidden="true" size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
