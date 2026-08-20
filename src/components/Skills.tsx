import { skillGroups } from '../data/skills'
import { SectionHeading } from './SectionHeading'

export function Skills() {
  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <SectionHeading
          id="skills-heading"
          eyebrow="Technical Skills"
          description="A practical stack across interface engineering, services, data systems, and cloud delivery."
        />
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <article className="skill-group" key={group.category}>
              <div className="skill-group__heading">
                <span>0{index + 1}</span>
                <div>
                  <h3>{group.category}</h3>
                  <p>{group.description}</p>
                </div>
              </div>
              <div className="skill-group__list">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
