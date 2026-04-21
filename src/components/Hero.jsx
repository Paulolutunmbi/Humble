import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../Data.jsx'
import { ScrollIndicator } from './ScrollIndicator'
import { HeroTechOrb } from './HeroTechOrb'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-fade-item', {
        opacity: 0,
        y: 28,
        duration: 0.72,
        delay: 0.2,
        stagger: 0.1
      })
      .from('.hero-visual-float', {
        opacity: 0,
        y: 24,
        duration: 0.75
      }, '-=0.4')
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

  return (
    <section id="home" className="hero py-16 md:py-24" ref={sectionRef}>
      {/* Background elements */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-grid" />

      <div className="w-full max-w-7xl mx-auto px-6 hero-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 hero-layout">
          <div className="hero-copy">
            <div className="hero-badge hero-fade-item">
              <span className="dot" />
              Available for opportunities
            </div>

            <p className="hero-greeting hero-fade-item">Hi, I'm {portfolio.name}</p>

            <h1 className="hero-name hero-fade-item">
              I build fast, responsive web applications.
            </h1>

            <p className="hero-title-sub hero-fade-item">
              Turning ideas into reliable, real-world digital experiences.
            </p>

            <p className="hero-description hero-fade-item">
              I design and ship clean user interfaces with React and modern web tools,
              focused on performance, accessibility, and maintainable code.
            </p>

            <div className="hero-buttons hero-fade-item">
              <button
                className="btn-primary"
                onClick={() => scrollToSection('projects')}
              >
                View Projects <span className="arrow">-&gt;</span>
              </button>
              <button
                className="btn-secondary"
                onClick={() => scrollToSection('contact')}
              >
                Let's Connect
              </button>
              <a
                className="hero-cv-link"
                href="/pdf/Paul_Oreoluwa_Olutunmbi_CV.pdf"
                download="Paul_Oreoluwa_Olutunmbi_CV.pdf"
                aria-label="Download Paul Olutunmbi CV PDF"
              >
                Download CV (PDF)
              </a>
            </div>
          </div>

          <div className="hero-visual hero-visual-float hidden lg:block">
            <HeroTechOrb />
          </div>

          <div className="hero-mobile-visual hero-visual-float lg:hidden" aria-hidden="true">
            <div className="hero-mobile-card">
              <span className="hero-mobile-glow" />
              <div className="hero-mobile-avatar-wrap">
                <img
                  src={portfolio.profileImage}
                  alt=""
                  loading="lazy"
                  className="hero-mobile-avatar"
                />
              </div>

              <div className="hero-mobile-code-card">
                <div className="hero-tech-code-top">
                  <span className="hero-tech-code-dot hero-tech-code-dot--red" />
                  <span className="hero-tech-code-dot hero-tech-code-dot--amber" />
                  <span className="hero-tech-code-dot hero-tech-code-dot--green" />
                </div>
                <code className="hero-tech-code-line">const app = build('fast UI')</code>
                <code className="hero-tech-code-line hero-tech-code-line--accent">deploy('reliable web experiences')</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator targetId="about" variant="slide" />
    </section>
  )
}