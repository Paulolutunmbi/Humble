import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../Data.jsx'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-badge', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3
      })
      .from('.hero-greeting', {
        opacity: 0,
        y: 20,
        duration: 0.5
      }, '-=0.3')
      .from('.hero-name .word-inner', {
        y: '110%',
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.out'
      }, '-=0.3')
      .from('.hero-title-sub', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, '-=0.4')
      .from('.hero-description', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, '-=0.3')
      .from('.hero-buttons > *', {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.5
      }, '-=0.3')
      .from('.scroll-indicator', {
        opacity: 0,
        y: -10,
        duration: 0.5
      }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  // Split name into words for animation
  const nameWords = portfolio.name.split(' ')

  return (
    <section id="home" className="hero" ref={sectionRef}>
      {/* Background elements */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-grid" />

      <div className="hero-content" ref={contentRef}>
        <div className="hero-badge">
          <span className="dot" />
          Available for opportunities
        </div>

        <p className="hero-greeting">Hello, I'm</p>

        <h1 className="hero-name">
          {nameWords.map((word, i) => (
            <span className="word" key={i}>
              <span className="word-inner">{word}</span>
              {i < nameWords.length - 1 && '\u00A0'}
            </span>
          ))}
        </h1>

        <p className="hero-title-sub">
          Aspiring <span className="highlight">Full-Stack Developer</span>
        </p>

        <p className="hero-description">
          {portfolio.about}
        </p>

        <div className="hero-buttons">
          <button
            className="btn-primary"
            onClick={() => scrollToSection('projects')}
          >
            View My Work <span className="arrow">→</span>
          </button>
          <a
            className="btn-secondary btn-cv"
            href="/pdf/Paul_Oreoluwa_Olutunmbi_CV.pdf"
            download="Paul_Oreoluwa_Olutunmbi_CV.pdf"
          >
            Download My CV
          </a>
          <button
            className="btn-secondary"
            onClick={() => scrollToSection('contact')}
          >
            Get In Touch
          </button>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}