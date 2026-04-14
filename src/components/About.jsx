import { portfolio } from '../data'

export function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-image">
            <img 
              src="/images/profile.jpg" 
              alt={portfolio.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300?text=Profile+Photo'
              }}
            />
          </div>
          
          <div className="about-text">
            <h3>Hi, I'm {portfolio.name}</h3>
            <p>{portfolio.about}</p>
            <p>{portfolio.longVision}</p>
            
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">6+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat">
                <div className="stat-number">2+</div>
                <div className="stat-label">Years Learning</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}