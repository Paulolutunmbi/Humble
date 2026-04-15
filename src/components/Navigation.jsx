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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
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
          <button className="nav-logo" onClick={() => scrollToSection('home')}>
            {portfolio.name.split(' ')[0]}<span className="accent">.</span>
          </button>

          <button
            className={`nav-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            {navLinks.map(link => (
              <li key={link.id}>
                <button onClick={() => scrollToSection(link.id)}>
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                aria-pressed={theme === 'light'}
                title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                <span className="sr-only">Toggle theme</span>
                <span className="theme-dot" aria-hidden="true" />
              </button>
            </li>
            <li>
              <button
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