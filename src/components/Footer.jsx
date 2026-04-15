import { portfolio } from '../Data.jsx'

export function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>
            © {year} <span className="footer-name">{portfolio.name}</span>. 
            Crafted with passion & code.
          </p>
        </div>

        <div className="footer-socials">
          <a
            href={portfolio.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="GitHub"
          >
            GH
          </a>
          <a
            href={portfolio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="LinkedIn"
          >
            LI
          </a>
          <a
            href={portfolio.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="WhatsApp"
          >
            WA
          </a>
          <a
            href={`mailto:${portfolio.email}`}
            className="footer-social-link"
            aria-label="Email"
          >
            ✉
          </a>
        </div>

        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          ↑
        </button>
      </div>
    </footer>
  )
}
