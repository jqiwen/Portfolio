import { ArrowUpRight, ChevronDown, Github } from 'lucide-react'
import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  const featuredProject = projects.find((project) => project.featured)
  const secondaryProjects = projects.filter((project) => !project.featured)

  if (!featuredProject) return null

  return (
    <section className="section section--tinted" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <SectionHeading
          id="projects-heading"
          eyebrow="Projects"
          description="A closer look at product architecture, interaction design, data flow, and the engineering decisions behind the work."
        />
        <article className="featured-project" id={featuredProject.id}>
          <div className="architecture-panel" aria-label="Hammerly architecture diagram">
            <div className="architecture-panel__header">
              <span>System view</span>
              <span>Hammerly / v1</span>
            </div>
            <div className="architecture-flow">
              <div className="architecture-node architecture-node--primary">
                <span>01</span><strong>React UI</strong><small>Listing &amp; bidding flows</small>
              </div>
              <div className="architecture-connector"><span>state</span></div>
              <div className="architecture-node">
                <span>02</span><strong>Zustand</strong><small>Shared client state</small>
              </div>
              <div className="architecture-connector"><span>HTTP</span></div>
              <div className="architecture-node">
                <span>03</span><strong>REST API</strong><small>Django services</small>
              </div>
              <div className="architecture-connector"><span>query</span></div>
              <div className="architecture-node">
                <span>04</span><strong>SQL</strong><small>Persistent data</small>
              </div>
            </div>
            <p className="architecture-panel__note">Architecture view · replaceable with a verified product screenshot</p>
          </div>

          <div className="featured-project__content">
            <p className="project-type">{featuredProject.type}</p>
            <h3>{featuredProject.title}</h3>
            <p className="featured-project__subtitle">{featuredProject.subtitle}</p>
            <p className="featured-project__description">{featuredProject.description}</p>
            <ul className="project-highlights project-highlights--featured">
              {featuredProject.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
            <div className="tag-list" aria-label="Hammerly technologies">
              {featuredProject.technologies.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
            <a className="project-link" href={featuredProject.github} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" size={17} />
              View repository
              <ArrowUpRight aria-hidden="true" className="project-link__arrow" size={16} />
            </a>
          </div>

          {featuredProject.details && (
            <details className="case-study">
              <summary>
                <span>View engineering case study</span>
                <ChevronDown aria-hidden="true" size={19} />
              </summary>
              <div className="case-study__grid">
                <div>
                  <p className="case-study__label">Problem</p>
                  <p>{featuredProject.details.problem}</p>
                </div>
                <div>
                  <p className="case-study__label">My role</p>
                  <p>{featuredProject.details.role}</p>
                </div>
                <div>
                  <p className="case-study__label">Architecture</p>
                  <ul>{featuredProject.details.architecture.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <p className="case-study__label">Engineering decisions</p>
                  <ul>{featuredProject.details.decisions.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>
            </details>
          )}
        </article>

        <div className="project-grid">
          {secondaryProjects.map((project) => <ProjectCard project={project} key={project.id} />)}
        </div>
      </div>
    </section>
  )
}
