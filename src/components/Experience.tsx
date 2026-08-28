import { experience } from '../data/experience'
import { SectionHeading } from './SectionHeading'
import { ExternalLink } from 'lucide-react'

export function Experience() {
  return (
    <section className="section experience-section" id="experience" aria-labelledby="experience-heading">
      <div className="container">
        <SectionHeading
          id="experience-heading"
          eyebrow="Experiences"
        />
        <div className="experience-list">
          {experience.map((item, index) => (
            <article className="experience-item" key={`${item.company}-${item.dates}`}>
              <div className="experience-item__meta">
                <span className="experience-item__number">0{index + 1}</span>
                <p className="experience-item__dates">{item.dates}</p>
                <p>{item.location}</p>
              </div>
              <div className="experience-item__body">
                <p className="experience-item__focus">{item.focus}</p>
                <h3>{item.role}</h3>
                <p className="experience-item__company">
                  {item.companyLink ? (
                    <a
                      href={item.companyLink}
                      target="_blank"
                      rel="noreferrer"
                      className="experience-item__company-link"
                    >
                      {item.company}
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  ) : (
                    item.company
                  )}
                </p>
                <ul className="achievement-list">
                  {item.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
                </ul>
                <div className="tag-list" aria-label={`${item.company} technologies`}>
                  {item.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
