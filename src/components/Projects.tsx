import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollPrevious, setCanScrollPrevious] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateCarouselState = useCallback(() => {
    const carousel = carouselRef.current
    const firstCard = carousel?.querySelector<HTMLElement>('.project-card')

    if (!carousel || !firstCard) return

    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap) || 0
    const step = firstCard.getBoundingClientRect().width + gap
    const nextIndex = Math.max(0, Math.min(projects.length - 1, Math.round(carousel.scrollLeft / step)))

    setCurrentIndex(nextIndex)
    setCanScrollPrevious(nextIndex > 0)
    setCanScrollNext(nextIndex < projects.length - 1)
  }, [])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const resizeObserver = new ResizeObserver(updateCarouselState)
    resizeObserver.observe(carousel)
    carousel.addEventListener('scroll', updateCarouselState, { passive: true })
    updateCarouselState()

    return () => {
      resizeObserver.disconnect()
      carousel.removeEventListener('scroll', updateCarouselState)
    }
  }, [updateCarouselState])

  const scrollToCard = (index: number) => {
    const carousel = carouselRef.current
    const firstCard = carousel?.querySelector<HTMLElement>('.project-card')

    if (!carousel || !firstCard) return

    const nextIndex = Math.max(0, Math.min(projects.length - 1, index))
    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap) || 0
    const step = firstCard.getBoundingClientRect().width + gap

    setCurrentIndex(nextIndex)
    setCanScrollPrevious(nextIndex > 0)
    setCanScrollNext(nextIndex < projects.length - 1)
    carousel.scrollTo({
      left: nextIndex * step,
      behavior: 'smooth',
    })
  }

  const scrollOneCard = (direction: -1 | 1) => scrollToCard(currentIndex + direction)

  const handleCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return

    if (event.key === 'ArrowLeft' && canScrollPrevious) {
      event.preventDefault()
      scrollOneCard(-1)
    }

    if (event.key === 'ArrowRight' && canScrollNext) {
      event.preventDefault()
      scrollOneCard(1)
    }
  }

  return (
    <section className="section section--tinted" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <SectionHeading
          id="projects-heading"
          eyebrow="Projects"
          description="A closer look at product architecture, interaction design, data flow, and the engineering decisions behind the work."
        />
        <div className="project-carousel">
          <div className="project-carousel__toolbar">
            <div className="project-carousel__controls" aria-label="Project carousel controls">
              <button
                type="button"
                aria-label="Show previous project"
                disabled={!canScrollPrevious}
                onClick={() => scrollOneCard(-1)}
              >
                <ChevronLeft aria-hidden="true" size={18} />
              </button>
              <button
                type="button"
                aria-label="Show next project"
                disabled={!canScrollNext}
                onClick={() => scrollOneCard(1)}
              >
                <ChevronRight aria-hidden="true" size={18} />
              </button>
            </div>
          </div>
          <div
            className="project-carousel__viewport"
            ref={carouselRef}
            role="region"
            aria-label="Projects carousel"
            tabIndex={0}
            onKeyDown={handleCarouselKeyDown}
          >
            {projects.map((project) => (
              <ProjectCard
                project={project}
                isExpanded={expandedProjectId === project.id}
                onToggle={() => setExpandedProjectId((currentId) => currentId === project.id ? null : project.id)}
                key={project.id}
              />
            ))}
            <div className="project-carousel__end-spacer" aria-hidden="true" />
            <div className="project-carousel__end-spacer" aria-hidden="true" />
          </div>
          <div className="project-carousel__pagination" aria-label="Choose a project">
            {projects.map((project, index) => (
              <button
                type="button"
                className={currentIndex === index ? 'is-active' : undefined}
                aria-label={`Go to project ${index + 1}: ${project.title}`}
                aria-current={currentIndex === index ? 'true' : undefined}
                onClick={() => scrollToCard(index)}
                key={project.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
