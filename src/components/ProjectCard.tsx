import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const titleId = `${project.id}-title`

  return (
    <article className="project-card" id={project.id} aria-labelledby={titleId}>
      <div className="project-card__meta">
        <span className="project-card__number">{String(index + 1).padStart(2, '0')}</span>
        <p className="project-card__date">{project.date}</p>
        <p className="project-card__classification">{project.classification}</p>
      </div>
      <div className="project-card__content">
        <p className="project-type">{project.type}</p>
        <h3 id={titleId}>{project.title}</h3>
        <p className="project-card__subtitle">{project.subtitle}</p>
        <p className="project-card__description">{project.description}</p>
        <ul className="project-highlights">
          {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <div className="tag-list tag-list--compact" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
      </div>
      <div className="project-card__visual">
        <div className={`project-card__image${project.imageFit === 'contain' ? ' project-card__image--contain' : ''}`}>
          {project.image ? (
            <img src={project.image} alt={project.imageAlt ?? ''} loading="lazy" decoding="async" />
          ) : (
            <div
              className="project-card__architecture"
              role="img"
              aria-label="Hammerly system architecture: React UI, Zustand state, REST API, Django services, and SQL persistence"
            >
              <div className="project-card__architecture-header">
                <span>System view</span>
                <span>Hammerly / v1</span>
              </div>
              <div className="project-card__architecture-flow">
                {['React UI', 'Zustand', 'REST API', 'Django', 'SQL'].map((layer, index) => (
                  <div className="project-card__architecture-node" key={layer}>
                    <span>0{index + 1}</span>
                    <strong>{layer}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="project-card__actions" aria-label={`${project.title} project links`}>
          {project.repoUrl && (
            <a className="project-action" href={project.repoUrl} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" size={14} />
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a className="project-action project-action--live" href={project.liveUrl} target="_blank" rel="noreferrer">
              <ExternalLink aria-hidden="true" size={14} />
              Live site
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
