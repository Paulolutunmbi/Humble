import { portfolio } from '../data'

export function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Hi, I'm {portfolio.name}</h1>
        <p className="hero-subtitle">{portfolio.title}</p>
        <p className="hero-description">{portfolio.about}</p>
        <button 
          className="hero-cta"
          onClick={() => scrollToSection('projects')}
        >
          View My Work
        </button>
      </div>
    </section>
  )
}