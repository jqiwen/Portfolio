import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { About } from './About'
import { Contact } from './Contact'
import { Education } from './Education'
import { EngineeringSummary } from './EngineeringSummary'
import { Experience } from './Experience'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { MobileBottomNav, type MobileTab } from './MobileBottomNav'
import { Navbar } from './Navbar'
import { Projects } from './Projects'

type Destination = { tab: MobileTab; section?: string }

function destination(hash: string): Destination {
  switch (hash) {
    case '#education': return { tab: 'education' }
    case '#experience': return { tab: 'experience' }
    case '#projects': return { tab: 'projects' }
    case '#me': return { tab: 'me' }
    case '#about': return { tab: 'home', section: 'about' }
    case '#contact': return { tab: 'me', section: hash.slice(1) }
    default: return { tab: 'home' }
  }
}

function readLocation(): Destination {
  const result = destination(window.location.hash)
  const section = window.history.state?.mobileSection
  if ((window.location.hash === '#home' && section === 'about') ||
      (window.location.hash === '#me' && section === 'contact')) result.section = section
  return result
}

export function MobileApp() {
  const [view, setView] = useState(readLocation)
  const contentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const previousRestoration = history.scrollRestoration
    history.scrollRestoration = 'manual'
    const onHistory = () => {
      const next = readLocation()
      history.replaceState({ ...history.state, mobileSection: next.section }, '', `#${next.tab}`)
      setView(next)
    }
    onHistory()
    window.addEventListener('popstate', onHistory)
    window.addEventListener('hashchange', onHistory)
    return () => {
      history.scrollRestoration = previousRestoration
      window.removeEventListener('popstate', onHistory)
      window.removeEventListener('hashchange', onHistory)
    }
  }, [])

  useLayoutEffect(() => {
    const content = contentRef.current
    if (!content) return
    const target = view.section ? document.getElementById(view.section) : null
    const top = target ? target.getBoundingClientRect().top - content.getBoundingClientRect().top + content.scrollTop : 0
    content.scrollTo({ top, behavior: 'instant' })
  }, [view])

  const navigate = (hash: string) => {
    const next = destination(hash)
    if (location.hash !== `#${next.tab}` || history.state?.mobileSection !== next.section) {
      history.pushState({ ...history.state, mobileSection: next.section }, '', `#${next.tab}`)
    }
    setView(next)
  }

  return (
    <>
      <Navbar onNavigate={navigate} showMenu={false} />
      <main id="main-content" className="mobile-app-content" ref={contentRef} tabIndex={-1}
        aria-label={`${view.tab === 'home' ? 'Me' : view.tab === 'me' ? 'Connect' : view.tab} view`}
        onClick={(event) => {
          if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
          const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
          if (!link) return
          event.preventDefault()
          navigate(link.hash)
        }}>
        {view.tab === 'home' && <><Hero /><EngineeringSummary /><About /></>}
        {view.tab === 'education' && <Education />}
        {view.tab === 'experience' && <Experience />}
        {view.tab === 'projects' && <Projects />}
        {view.tab === 'me' && <><Contact /><Footer /></>}
      </main>
      <MobileBottomNav activeTab={view.tab} onSelect={navigate} />
    </>
  )
}
