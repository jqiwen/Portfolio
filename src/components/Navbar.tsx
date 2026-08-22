import { FileText, Github, Linkedin, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { ThemeToggle } from './ThemeToggle'

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },

]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Qiwen(Kyra) Jiao, back to top">
          <span className="brand__mark" aria-hidden="true">KJ</span>
          <span className="brand__name">Qiwen(Kyra) Jiao</span>
        </a>

        <div
          id="mobile-navigation"
          className={`nav-panel${isOpen ? ' nav-panel--open' : ''}`}
        >
          <div className="nav-center">
            <div className="nav-links">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="nav-actions">
            <a
              className="nav-icon"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub profile"
              title="GitHub"
            >
              <Github aria-hidden="true" size={17} />
            </a>

            <a
              className="nav-icon"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Open LinkedIn profile"
              title="LinkedIn"
            >
              <Linkedin aria-hidden="true" size={17} />
            </a>

            <a
              className="nav-icon"
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Resume"
              title="Resume"
            >
              <FileText aria-hidden="true" size={17} />
            </a>
            <ThemeToggle />
          </div>
        </div>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
    </header>
  )
}
