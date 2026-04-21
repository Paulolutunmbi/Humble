import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../Data.jsx'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    key: 'frontend',
    title: 'Frontend',
    icon: '🎨',
    items: portfolio.skills.frontend ?? []
  },
  {
    key: 'backend',
    title: 'Backend',
    icon: '⚙️',
    items: portfolio.skills.backend ?? []
  },
  {
    key: 'database',
    title: 'Database',
    icon: '🗄️',
    items: portfolio.skills.database ?? []
  },
  {
    key: 'tools',
    title: 'Tools',
    icon: '🛠️',
    items: portfolio.skills.tools ?? []
  }
]

export function Skills() {
  const sectionRef = useRef(null)
  const visibleCategories = skillCategories.filter(
    (category) => Array.isArray(category.items) && category.items.length > 0
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      gsap.from('.skills .section-header > *', {
        scrollTrigger: {
          trigger: '.skills .section-header',
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
      gsap.from('.skills .glass-card', {
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <p className="section-label">My Skills</p>
          <h2 className="section-title">Technologies & Tools</h2>
          <p className="section-subtitle">
            The technologies I use to bring ideas to life
          </p>
        </div>

        <div className="skills-grid">
          {visibleCategories.length > 0 ? (
            visibleCategories.map(category => (
              <div key={category.key} className="glass-card">
                <div className="card-shimmer" />
                <div className="skill-category">
                  <h3>
                    <span className="skill-icon">{category.icon}</span>
                    {category.title}
                  </h3>
                  <div className="skill-items">
                    {category.items.map(skill => (
                      <span key={skill} className="skill-item">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-card">
              <div className="skill-category">
                <h3>Skills</h3>
                <p>No skills data found. Please update your data source.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}