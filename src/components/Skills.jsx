import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../Data.jsx'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    key: 'frontend',
    title: 'Frontend',
    icon: 'FE',
    items: portfolio.skills.frontend ?? []
  },
  {
    key: 'backend',
    title: 'Backend',
    icon: 'BE',
    items: portfolio.skills.backend ?? []
  },
  {
    key: 'database',
    title: 'Database',
    icon: 'DB',
    items: portfolio.skills.database ?? []
  },
  {
    key: 'tools',
    title: 'Tools',
    icon: 'TL',
    items: portfolio.skills.tools ?? []
  }
]

const techMarks = {
  'HTML5': 'H5',
  'CSS3': 'C3',
  'React.js': 'Rx',
  'Tailwind CSS': 'Tw',
  Bootstrap: 'Bs',
  'Node.js': 'Nd',
  'Express.js': 'Ex',
  'Python (Basics)': 'Py',
  MongoDB: 'Mg',
  Firebase: 'Fb',
  Firestore: 'Fs',
  Git: 'Gt',
  GitHub: 'Gh',
  'REST APIs': 'Api',
  'AI Productivity Tools': 'AI'
}

const getTechMark = (skill) => techMarks[skill] ?? skill.slice(0, 2).toUpperCase()

export function Skills() {
  const sectionRef = useRef(null)
  const visibleCategories = skillCategories.filter(
    (category) => Array.isArray(category.items) && category.items.length > 0
  )

  useEffect(() => {
    const cleanupFns = []

    const ctx = gsap.context(() => {
      gsap.from('.skills-section__heading > *', {
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 26,
        stagger: 0.1,
        duration: 0.65,
        ease: 'power3.out'
      })

      gsap.from('.skills-section__card', {
        scrollTrigger: {
          trigger: '.skills-section__grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 46,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out'
      })

      const cards = gsap.utils.toArray('.skills-section__card')

      cards.forEach((card) => {
        const onEnter = () => {
          gsap.to(card, {
            scale: 1.02,
            rotateX: 1.5,
            rotateY: -1.5,
            duration: 0.35,
            ease: 'power2.out'
          })
        }

        const onLeave = () => {
          gsap.to(card, {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            duration: 0.35,
            ease: 'power2.out'
          })
        }

        card.addEventListener('mouseenter', onEnter)
        card.addEventListener('mouseleave', onLeave)

        cleanupFns.push(() => {
          card.removeEventListener('mouseenter', onEnter)
          card.removeEventListener('mouseleave', onLeave)
        })
      })
    }, sectionRef)

    return () => {
      cleanupFns.forEach((cleanup) => cleanup())
      ctx.revert()
    }
  }, [])

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="container">
        <div className="skills-section__heading">
          <h2 className="skills-section__title">My Skills</h2>
          <p className="skills-section__subtitle">Technologies &amp; Tools</p>
          <p className="skills-section__description">
            The technologies I use to bring ideas to life
          </p>
        </div>

        <div className="skills-section__grid">
          {visibleCategories.length > 0 ? (
            visibleCategories.map(category => (
              <article key={category.key} className={`skills-section__card skills-section__card--${category.key}`}>
                <div className="skills-section__card-glow" aria-hidden="true" />
                <div className="skills-section__card-header">
                  <div className={`skills-section__category-icon skills-section__category-icon--${category.key}`}>
                    {category.icon}
                  </div>
                  <h3 className="skills-section__category-title">
                    {category.title}
                  </h3>
                </div>

                <ul className="skills-section__skill-list">
                    {category.items.map(skill => (
                    <li key={skill} className="skills-section__skill-item">
                      <span className={`skills-section__skill-mark skills-section__skill-mark--${category.key}`} aria-hidden="true">
                        {getTechMark(skill)}
                      </span>
                      <span className="skills-section__skill-name">{skill}</span>
                    </li>
                    ))}
                </ul>
              </article>
            ))
          ) : (
            <article className="skills-section__card">
              <div className="skills-section__card-header">
                <h3 className="skills-section__category-title">Skills</h3>
              </div>
              <div className="skills-section__empty-state">
                <p>No skills data found. Please update your data source.</p>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  )
}