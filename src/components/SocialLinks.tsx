import { FileText, Github, Linkedin } from 'lucide-react'
import { profile } from '../data/profile'

interface SocialLinksProps {
  includeResume?: boolean
  compact?: boolean
}

export function SocialLinks({ includeResume = false, compact = false }: SocialLinksProps) {
  return (
    <div className={`social-links${compact ? ' social-links--compact' : ''}`}>
      <a
        className="icon-link"
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Kyra’s GitHub profile"
      >
        <Github aria-hidden="true" size={compact ? 17 : 19} />
      </a>
      <a
        className="icon-link"
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Kyra’s LinkedIn profile"
      >
        <Linkedin aria-hidden="true" size={compact ? 17 : 19} />
      </a>
      {includeResume && (
        <a
          className="icon-link"
          href={profile.resume}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Kyra’s resume in a new tab"
        >
          <FileText aria-hidden="true" size={compact ? 17 : 19} />
        </a>
      )}
    </div>
  )
}
