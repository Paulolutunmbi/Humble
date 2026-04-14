import { portfolio } from '../data'

export function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Projects</h2>
        <p className="section-subtitle">Here are some projects I've built</p>
        
        <div className="projects-grid">
          {portfolio.projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">{project.image}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              
              <div className="project-links">
                {project.github !== '#' && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}