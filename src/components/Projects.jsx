import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../Data.jsx'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project }) {
  const cardRef = useRef(null)
  const getLinkOrPlaceholder = (url) =>
    typeof url === 'string' && url.trim().length > 0 ? url.trim() : '#'

  const demoUrl = getLinkOrPlaceholder(project.demo)
  const codeUrl = getLinkOrPlaceholder(project.github)
  const isDemoDisabled = demoUrl === '#'
  const isCodeDisabled = codeUrl === '#'

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 800,
      transformOrigin: 'center center'
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power3.out'
    })
  }, [])

  return (
    <div
      ref={cardRef}
      className="glass-card tilt-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="card-shimmer" />
      <div className="project-card">
        <div className="project-media" aria-hidden={!project.image}>
          {typeof project.image === 'string' && project.image.startsWith('/') ? (
            <img
              src={project.image}
              alt={`${project.title} preview`}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div className="project-icon" aria-hidden="true">{project.image}</div>
          )}
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="project-links">
          <a
            href={demoUrl}
            target={isDemoDisabled ? undefined : '_blank'}
            rel={isDemoDisabled ? undefined : 'noopener noreferrer'}
            className={`project-link primary ${isDemoDisabled ? 'is-disabled' : ''}`}
            aria-disabled={isDemoDisabled}
            title={isDemoDisabled ? 'Live demo coming soon' : `Open ${project.title} live demo in a new tab`}
            onClick={isDemoDisabled ? (event) => event.preventDefault() : undefined}
          >
            Live Demo <span className="link-arrow">↗</span>
          </a>
          <a
            href={codeUrl}
            target={isCodeDisabled ? undefined : '_blank'}
            rel={isCodeDisabled ? undefined : 'noopener noreferrer'}
            className={`project-link ${isCodeDisabled ? 'is-disabled' : ''}`}
            aria-disabled={isCodeDisabled}
            title={isCodeDisabled ? 'Code repository coming soon' : `Open ${project.title} source code in a new tab`}
            onClick={isCodeDisabled ? (event) => event.preventDefault() : undefined}
          >
            View Code <span className="link-arrow">↗</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      gsap.from('.projects .section-header > *', {
        scrollTrigger: {
          trigger: '.projects .section-header',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out'
      })

      // Stagger cards
      gsap.from('.projects .glass-card', {
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <p className="section-label">My Work</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A collection of projects showcasing my skills and learning journey
          </p>
        </div>

        <div className="projects-grid">
          {portfolio.projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}