import { profile } from '../data/profile'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  return (
    
    <footer className="site-footer section--tinted">
      <div className="container site-footer__inner">
        <p> © 2026 Qiwen (Kyra) Jiao </p>
        
        {/* <div>
          <p>Designed and built by {profile.shortName}.</p>
          <span>React · TypeScript · GitHub Pages</span>
        </div>
        <SocialLinks compact includeResume /> */}
      </div>
    </footer>
  )
}
