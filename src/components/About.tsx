import { ArrowDownRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <SectionHeading id="about-heading" eyebrow="About" />
        <div className="about-grid">
          <div className="about-copy">
            <p className="about-copy__lead">
              I’m a software engineer focused on frontend and full-stack development.
            </p>
            <p>
              I enjoy building practical applications across the complete development lifecycle—from user interfaces and state management to REST APIs, databases, deployment, and cloud infrastructure.
            </p>
            <p>
              My experience spans frontend-heavy enterprise products and distributed data systems. I’m currently completing my MEng in Electrical &amp; Computer Engineering at the University of Waterloo.
            </p>
            <a className="text-link" href="#experience">
              See working experience <ArrowDownRight aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
