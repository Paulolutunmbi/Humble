import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../Data.jsx'

gsap.registerPlugin(ScrollTrigger)

const aboutTechGroups = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' }
]

export function About() {
  const sectionRef = useRef(null)
  const technologiesCount = aboutTechGroups.reduce((count, group) => {
    const items = portfolio.skills?.[group.key]
    return count + (Array.isArray(items) ? items.length : 0)
  }, 0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.from('.about .section-header > *', {
        scrollTrigger: {
          trigger: '.about .section-header',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out'
      })

      // Image animation
      gsap.from('.about-image-wrapper', {
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power3.out'
      })

      // Text animation
      gsap.from('.about-text > *', {
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      })

      // Stats animation
      gsap.from('.stat', {
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <p className="section-label">About Me</p>
          <h2 className="section-title">Get to know me</h2>
          <p className="section-subtitle">
            A passionate developer on a journey to create impactful digital experiences
          </p>
        </div>

        <div className="about-content">
          <div className="about-image-wrapper">
            <div className="about-image-container">
              <div className="about-image-glow" />
              <img
                src={portfolio.profileImage}
                alt={portfolio.name}
                onError={(e) => {
                  e.target.src = 'https://api.dicebear.com/7.x/initials/svg?seed=PO&backgroundColor=059669&textColor=ffffff'
                }}
              />
            </div>
            <div className="about-experience-badge">
              <div className="number">1+</div>
              <div className="label">Years Learning</div>
            </div>
          </div>

          <div className="about-text">
            <h3>
              Building the future, one line of code at a time
            </h3>
            <p>{portfolio.about}</p>
            <p>{portfolio.longVision}</p>

            <div className="about-tech" aria-label="Core technology stack">
              {aboutTechGroups.map((group) => {
                const items = portfolio.skills?.[group.key] ?? []
                return (
                  <div className="about-tech-group" key={group.key}>
                    <h4 className="about-tech-title">{group.label}</h4>
                    <ul className="about-tech-list">
                      {items.map((tech) => (
                        <li className="about-tech-item" key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">{portfolio.projects.length}+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat">
                <div className="stat-number">{technologiesCount}+</div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat">
                <div className="stat-number">∞</div>
                <div className="stat-label">Curiosity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}