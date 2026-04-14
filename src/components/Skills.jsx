import { portfolio } from '../data'

export function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2>My Skills</h2>
        <p className="section-subtitle">Technologies and tools I work with</p>
        
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Frontend</h3>
            <div className="skill-items">
              {portfolio.skills.frontend.map(skill => (
                <div key={skill} className="skill-item">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          
          <div className="skill-category">
            <h3>Tools & Platforms</h3>
            <div className="skill-items">
              {portfolio.skills.tools.map(skill => (
                <div key={skill} className="skill-item">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          
          <div className="skill-category">
            <h3>Currently Learning</h3>
            <div className="skill-items">
              {portfolio.skills.learning.map(skill => (
                <div key={skill} className="skill-item">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}