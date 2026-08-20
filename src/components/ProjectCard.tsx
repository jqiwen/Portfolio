import { ArrowUpRight, Github } from 'lucide-react'
import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      {project.image && (
        <div className="project-card__image">
          <img src={project.image} alt={project.imageAlt ?? ''} loading="lazy" decoding="async" />
        </div>
      )}
      <div className="project-card__content">
        <p className="project-type">{project.type}</p>
        <h3>{project.title}</h3>
        <p className="project-card__subtitle">{project.subtitle}</p>
        <p className="project-card__description">{project.description}</p>
        <ul className="project-highlights">
          {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <div className="tag-list tag-list--compact" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <a className="project-link" href={project.github} target="_blank" rel="noreferrer">
          <Github aria-hidden="true" size={17} />
          View repository
          <ArrowUpRight aria-hidden="true" className="project-link__arrow" size={16} />
        </a>
      </div>
    </article>
  )
}
