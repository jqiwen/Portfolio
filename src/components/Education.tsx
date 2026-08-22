import { GraduationCap, MapPin } from 'lucide-react'
import { education } from '../data/education'
import { SectionHeading } from './SectionHeading'

export function Education() {
  return (
    <section className="section section--tinted" id="education" aria-labelledby="education-heading">
      <div className="container">
        <SectionHeading id="education-heading" eyebrow="Education"  />
        <div className="education-grid">
          {education.map((item) => (
            <article className="education-card" key={item.school}>
              <GraduationCap className="education-card__icon" aria-hidden="true" size={22} />
              <div className="education-card__topline">
                <p>{item.dates}</p>
                <span>GPA {item.gpa}</span>
              </div>
              <h3>{item.degree}</h3>
              <h3>{item.program}</h3>
              <p className="education-card__school">{item.school}</p>
              <p className="education-card__location"><MapPin aria-hidden="true" size={14} />{item.location}</p>
              <img
                className={`education-card__school-logo education-card__school-logo--${item.logoVariant}`}
                src={item.logo}
                alt={`${item.school} logo`}
                loading="lazy"
                decoding="async"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
