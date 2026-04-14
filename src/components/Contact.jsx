import { useState } from 'react'
import { portfolio } from '../data'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
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

    try {
      // Send to Formspree
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMessage('Failed to send message. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('An error occurred. Please try again.')
      console.error('Form submission error:', error)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Get In Touch</h2>
        <p className="section-subtitle">Have a question or want to work together?</p>

        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Let's connect</h3>
            <p>I'd love to hear from you. Feel free to reach out with any questions or opportunities.</p>
            
            <div className="contact-links">
              <a href={`mailto:${portfolio.email}`} className="contact-link">
                📧 Email: {portfolio.email}
              </a>
              <a href={portfolio.github} target="_blank" rel="noopener noreferrer" className="contact-link">
                💻 GitHub
              </a>
              <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                💼 LinkedIn
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows="5"
                required
              ></textarea>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {status === 'success' && <p className="success-message">✓ Message sent successfully!</p>}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}