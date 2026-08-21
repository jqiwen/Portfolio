import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  return (
    <section className="section section--tinted" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <SectionHeading
          id="projects-heading"
          eyebrow="Projects"
          description="A closer look at product architecture, interaction design, data flow, and the engineering decisions behind the work."
        />
        <div className="project-grid">
          {projects.map((project) => <ProjectCard project={project} key={project.id} />)}
        </div>
      </div>
    </section>
  )
}
