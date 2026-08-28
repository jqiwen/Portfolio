import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export function SectionRail() {
  const [activeSection, setActiveSection] =
    useState<(typeof sections)[number]['id']>('about')

  const [progress, setProgress] = useState(0)

  const [isVisible, setIsVisible] = useState(false)

  const [isCollapsed, setIsCollapsed] = useState(true)

  useEffect(() => {
    let animationFrame = 0

    const updateVisibility = () => {
      const aboutSection = document.getElementById('about')

      if (!aboutSection) return

      const aboutTop = aboutSection.getBoundingClientRect().top

      // Match the existing navbar-safe scroll offset used by the page.
      setIsVisible(aboutTop <= 86)

      animationFrame = 0
    }

    const handleScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateVisibility)
      }
    }

    updateVisibility()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  useEffect(() => {
    const sectionElements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const isAtPageBottom =
          window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2

        if (isAtPageBottom) {
          setActiveSection('contact')
          return
        }

        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]

        if (activeEntry) {
          setActiveSection(activeEntry.target.id as (typeof sections)[number]['id'])
        }
      },
      {
        rootMargin: '-20% 0px -72% 0px',
        threshold: 0,
      },
    )

    sectionElements.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let animationFrame = 0

    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0

      setProgress(Math.min(1, Math.max(0, nextProgress)))

      if (nextProgress >= 1) {
        setActiveSection('contact')
      } else {
        const sectionAtActivationPoint = document
          .elementFromPoint(window.innerWidth / 2, window.innerHeight * 0.25)
          ?.closest<HTMLElement>('section[id]')

        if (sections.some(({ id }) => id === sectionAtActivationPoint?.id)) {
          setActiveSection(sectionAtActivationPoint?.id as (typeof sections)[number]['id'])
        }
      }

      animationFrame = 0
    }

    const handleScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <nav
      className={`section-rail${isVisible ? ' section-rail--visible' : ''}${
        isCollapsed ? ' section-rail--collapsed' : ''
      }`}
      aria-label="Page sections"
    >
      <div className="section-rail__track" aria-hidden="true">
        <span
          className="section-rail__progress"
          style={{ transform: `scaleY(${progress})` }}
        />
      </div>

      <div className="section-rail__content" aria-hidden={isCollapsed || undefined}>
        <ol className="section-rail__list">
          {sections.map(({ id, label }) => {
            const isActive = activeSection === id

            return (
              <li key={id}>
                <a
                  className={`section-rail__link${
                    isActive ? ' section-rail__link--active' : ''
                  }`}
                  href={`#${id}`}
                  aria-current={isActive ? 'location' : undefined}
                  tabIndex={isCollapsed ? -1 : undefined}
                  onClick={(event) => {
                    event.preventDefault()

                    setActiveSection(id)

                    document.getElementById(id)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }}
                >
                  <span className="section-rail__marker" aria-hidden="true" />
                  <span className="section-rail__label">{label}</span>
                </a>
              </li>
            )
          })}
        </ol>
      </div>

      <button
        type="button"
        className="section-rail__toggle"
        onClick={() => setIsCollapsed((current) => !current)}
        aria-label={isCollapsed ? 'Expand section navigation' : 'Collapse section navigation'}
        aria-expanded={!isCollapsed}
      >
        {isCollapsed ? (
          <ChevronRight size={16} aria-hidden="true" />
        ) : (
          <ChevronLeft size={16} aria-hidden="true" />
        )}
      </button>
    </nav>
  )
}
