import { FileText, Github, Linkedin, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
// import { ThemeToggle } from './ThemeToggle'

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },


]

export function Navbar({ onNavigate, showMenu = true }: {
  onNavigate?: (hash: string) => void
  showMenu?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const closeOnResize = () => setIsOpen(false)
    media.addEventListener('change', closeOnResize)
    if (!isOpen || !media.matches) return () => media.removeEventListener('change', closeOnResize)

    const scrollY = window.scrollY
    const previous = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width }
    Object.assign(document.body.style, { position: 'fixed', top: `-${scrollY}px`, width: '100%' })
    const background = [...document.querySelectorAll<HTMLElement>('#root > :not(header), body > .skip-link')]
    const inertStates = background.map(element => element.inert)
    background.forEach(element => { element.inert = true })
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const items = [...(headerRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [])]
        .filter(element => element.getClientRects().length > 0)
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', trapFocus)
    headerRef.current?.querySelector<HTMLElement>('.nav-links a')?.focus()
    return () => {
      media.removeEventListener('change', closeOnResize)
      document.removeEventListener('keydown', trapFocus)
      Object.assign(document.body.style, previous)
      background.forEach((element, index) => { element.inert = inertStates[index] })
      window.scrollTo({ top: scrollY, behavior: 'instant' })
      toggleRef.current?.focus({ preventScroll: true })
    }
  }, [isOpen])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    const closeOnHistory = () => setIsOpen(false)
    window.addEventListener('popstate', closeOnHistory)
    window.addEventListener('hashchange', closeOnHistory)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('popstate', closeOnHistory)
      window.removeEventListener('hashchange', closeOnHistory)
    }
  }, [])

  return (
    <header ref={headerRef} className={`site-header${isOpen ? ' site-header--menu-open' : ''}`}>
      <nav className="navbar container" aria-label="Primary navigation">
        <a className="brand" href="#top" onClick={(event) => {
          setIsOpen(false)
          if (onNavigate) { event.preventDefault(); onNavigate('#home') }
        }} aria-label="Qiwen(Kyra) Jiao, back to top">
          <img
            className="brand__mark"
            src="/favicon.png"
            alt=""
            aria-hidden="true"
          />
          <span className="brand__name">Qiwen(Kyra) Jiao</span>
          <span className="mobile-only mobile-brand-name">Qiwen(Kyra) Jiao</span>
        </a>

        {showMenu && <div
          id="mobile-navigation"
          className={`nav-panel${isOpen ? ' nav-panel--open' : ''}`}
        >
          <div className="nav-center">
            <div className="nav-links">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    setIsOpen(false)
                    if (onNavigate) { event.preventDefault(); onNavigate(item.href) }
                  }}
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
              <span className="mobile-only">GitHub</span>
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
              <span className="mobile-only">LinkedIn</span>
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
              <span className="mobile-only">Resume</span>
            </a>
            {/* <ThemeToggle /> */}
          </div>
        </div>}

        {showMenu && <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>}
      </nav>
    </header>
  )
}
