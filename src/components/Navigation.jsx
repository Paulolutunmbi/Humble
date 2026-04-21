import { useState, useEffect } from 'react'
import { portfolio } from '../Data.jsx'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)')?.matches
    return prefersLight ? 'light' : 'dark'
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 769px)')
    const handleViewportChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }

    mediaQuery.addEventListener('change', handleViewportChange)
    return () => mediaQuery.removeEventListener('change', handleViewportChange)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
  ]

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <button type="button" className="nav-logo" onClick={() => scrollToSection('home')}>
            {portfolio.name.split(' ')[0]}<span className="accent">.</span>
          </button>

          <button
            type="button"
            className={`nav-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${menuOpen ? 'open' : ''}`} id="primary-navigation">
            {navLinks.map(link => (
              <li key={link.id} className="nav-item nav-item-link">
                <button type="button" className="nav-link-btn" onClick={() => scrollToSection(link.id)}>
                  {link.label}
                </button>
              </li>
            ))}
            <li className="nav-item nav-item-cv">
              <a
                className="nav-cv"
                href="/pdf/Paul_Oreoluwa_Olutunmbi_CV.pdf"
                download="Paul_Oreoluwa_Olutunmbi_CV.pdf"
              >
                Download CV
              </a>
            </li>
            <li className="nav-item nav-item-theme">
              <span className="nav-theme-label">Theme</span>
              <button
                type="button"
                className={`theme-toggle ${theme === 'light' ? 'is-light' : 'is-dark'}`}
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                aria-pressed={theme === 'light'}
                title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                <span className="sr-only">Toggle theme</span>
                <span className="theme-toggle-core" aria-hidden="true">
                  <svg className="theme-icon icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.56 1.56M17.51 17.51l1.56 1.56M2 12h2.2M19.8 12H22M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56"></path>
                  </svg>
                  <svg className="theme-icon icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path>
                  </svg>
                </span>
              </button>
            </li>
            <li className="nav-item nav-item-cta">
              <button
                type="button"
                className="nav-cta"
                onClick={() => scrollToSection('contact')}
              >
                Get in Touch
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`nav-overlay ${menuOpen ? 'visible' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  )
}