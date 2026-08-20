import { profile } from '../data/profile'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p>Designed and built by {profile.shortName}.</p>
          <span>React · TypeScript · GitHub Pages</span>
        </div>
        <SocialLinks compact includeResume />
      </div>
    </footer>
  )
}
