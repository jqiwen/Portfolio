import { ArrowDownRight, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { SocialLinks } from './SocialLinks'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="hero__label"><span aria-hidden="true" /> Software Engineer</p>
          <h1 id="hero-title">Hi, I’m <em>Kyra.</em></h1>
          <p className="hero__statement">I build scalable web applications and practical software systems.</p>
          <p className="hero__description">
            Software engineer with experience across frontend, backend, cloud infrastructure, and data systems. Currently pursuing an MEng in Electrical &amp; Computer Engineering at the University of Waterloo.
          </p>
          <div className="hero__actions">
            <a className="button button--secondary" href="#experience">
              View my experience
              <ArrowDownRight aria-hidden="true" size={17} />
            </a>
            <a className="button button--primary" href="#projects">
              View my work
              <ArrowDownRight aria-hidden="true" size={17} />
            </a>
            <SocialLinks includeResume />
          </div>
          <p className="hero__location">
            <MapPin aria-hidden="true" size={15} />
            {profile.location}
          </p>
        </div>

        <div className="hero-console" aria-label="Engineering profile summary">
          <div className="hero-console__bar">
            <span /><span /><span />
            <p>engineer.profile</p>
          </div>
          <div className="hero-console__body">
            <p className="code-line"><span>const</span> engineer = {'{'}</p>
            <dl className="code-object">
              <div><dt>focus:</dt><dd>[“frontend”, “full-stack”],</dd></div>
              <div><dt>builds:</dt><dd>“practical products”,</dd></div>
              <div><dt>caresAbout:</dt><dd>[“clarity”, “scale”, “users”],</dd></div>
              <div><dt>currently:</dt><dd>“MEng @ Waterloo”</dd></div>
            </dl>
            <p className="code-line">{'}'}</p>
          </div>
          <div className="hero-console__footer">
            <span className="status-dot" />
            <span>Open to software engineering opportunities</span>
          </div>
        </div>
      </div>
    </section>
  )
}
