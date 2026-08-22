import {   ArrowDownRight,
  Briefcase,
  FolderKanban, } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

const aboutData = {
  lead: 'I’m a software engineer focused on frontend and full-stack development.',
  paragraphs: [
    'I enjoy taking features from an idea to a working product—building responsive interfaces, managing application state, connecting frontend flows to backend APIs, working with databases, and deploying applications to the cloud. I’m comfortable working across the stack, but I especially enjoy the product-facing side of software engineering where technical decisions directly affect the user experience.',

    'My experience includes enterprise web applications, distributed systems, cloud-based data pipelines, and AI-powered products. Through these projects, I’ve worked on practical engineering problems such as designing reusable components, integrating services, handling application state, improving reliability, and building systems that can scale beyond a local prototype.',

    'I care about writing software that is clear, maintainable, and useful. I prefer simple solutions when they work, but I’m also interested in system design, cloud infrastructure, and performance when an application needs to scale.',

    'I’m currently completing my MEng in Electrical & Computer Engineering at the University of Waterloo and looking for Software Engineer, Frontend Engineer, and Full-Stack Engineer opportunities.',
  ],
}

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <SectionHeading id="about-heading" eyebrow="About" />

        <div className="about-grid">
          <div className="about-copy">
            <p className="about-copy__lead">
              {aboutData.lead}
            </p>

            {aboutData.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                {paragraph}
              </p>
            ))}

            <div className="about-links">
              <a className="text-link" href="#experience">
                <Briefcase aria-hidden="true" size={18} />
                See working experiences
                <ArrowDownRight aria-hidden="true" size={16} />
              </a>

              <a className="text-link" href="#projects">
                <FolderKanban aria-hidden="true" size={18} />
                See personal projects
                <ArrowDownRight aria-hidden="true" size={16} />
              </a>
            </div>
          </div>

          <div className="about-photo">
            <div className="about-photo__frame">
              <img
                src="/me/my-photo.png"
                alt="Qiwen Kyra"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}