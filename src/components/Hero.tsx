import { ArrowRight, Cloud, Code2, Database, MapPin, Target } from 'lucide-react'
import { profile } from '../data/profile'
import { SocialLinks } from './SocialLinks'

const capabilities = [
  {
    title: 'Full-Stack Developer',
    description: 'Building responsive web applications from UI and state management to APIs, databases, and deployment.',
    icon: Code2,
  },
  {
    title: 'Cloud & DevOps',
    description: 'Deploying reliable applications with cloud infrastructure, Docker, CI/CD, and scalable service architecture.',
    icon: Cloud,
  },
  {
    title: 'Data-Oriented',
    description: 'Designing REST APIs, data models, distributed workflows, and database-backed applications.',
    icon: Database,
  },
  {
    title: 'Product-Focused',
    description: 'Turning product requirements into clear, maintainable features with performance and user experience in mind.',
    icon: Target,
  },
]

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="hero__label"><span aria-hidden="true" /> Software Engineer</p>
          <h1 id="hero-title">Hi, I’m <em>Qiwen (Kyra).</em></h1>
          <p className="hero__description">
            Software engineer with experience across frontend, backend, cloud infrastructure, and data systems. Currently pursuing an MEng in Electrical &amp; Computer Engineering at the University of Waterloo.
          </p>
          <div className="hero__actions">
            <a className="button button--secondary" href="#about">
              About me
              <ArrowRight aria-hidden="true" size={17} />
            </a>
            <SocialLinks includeResume />
          </div>
          <p className="hero__location">
            <MapPin aria-hidden="true" size={15} />
            {profile.location}
          </p>
        </div>

        <aside className="hero-capabilities" aria-label="Engineering capabilities">
          <div className="hero-capabilities__grid">
            {capabilities.map(({ title, description, icon: Icon }) => (
              <article className="hero-capability" key={title}>
                <div className="hero-capability__icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.9} />
                </div>
                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
