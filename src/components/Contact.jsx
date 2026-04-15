import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../Data.jsx'

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      gsap.from('.contact .section-header > *', {
        scrollTrigger: {
          trigger: '.contact .section-header',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out'
      })

      // Contact info
      gsap.from('.contact-info > *', {
        scrollTrigger: {
          trigger: '.contact-wrapper',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      })

      // Contact form
      gsap.from('.contact-form-card', {
        scrollTrigger: {
          trigger: '.contact-form-card',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 30,
        duration: 0.7,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrorMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all fields')
      return
    }

    if (!formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    const text = [
      `Hi Paul, my name is ${formData.name}.`,
      `Email: ${formData.email}`,
      '',
      formData.message
    ].join('\n')

    const base = portfolio.whatsapp
    const url = `${base}?text=${encodeURIComponent(text)}`

    window.open(url, '_blank', 'noopener,noreferrer')
    setStatus('success')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a question or want to collaborate? I'd love to hear from you
          </p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Get in touch</h3>
            <p>
              I'm always open to new opportunities, collaborations, and interesting
              conversations. Feel free to reach out through any of the channels below.
            </p>

            <div className="contact-methods">
              <a href={`mailto:${portfolio.email}`} className="contact-method">
                <div className="method-icon">📧</div>
                <div className="method-info">
                  <span className="method-label">Email</span>
                  <span className="method-value">{portfolio.email}</span>
                </div>
              </a>

              <a href={portfolio.github} target="_blank" rel="noopener noreferrer" className="contact-method">
                <div className="method-icon">💻</div>
                <div className="method-info">
                  <span className="method-label">GitHub</span>
                  <span className="method-value">@Paulolutunmbi</span>
                </div>
              </a>

              <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" className="contact-method">
                <div className="method-icon">💼</div>
                <div className="method-info">
                  <span className="method-label">LinkedIn</span>
                  <span className="method-value">Paul Olutunmbi</span>
                </div>
              </a>

              <a href={portfolio.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-method">
                <div className="method-icon">📱</div>
                <div className="method-info">
                  <span className="method-label">WhatsApp</span>
                  <span className="method-value">{portfolio.phone}</span>
                </div>
              </a>
            </div>
          </div>

          <div className="contact-form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  rows="5"
                  required
                />
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {status === 'success' && (
                <p className="success-message">✓ Message sent successfully!</p>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}