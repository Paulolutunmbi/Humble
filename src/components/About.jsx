import { portfolio } from '../data'

export function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <p>{portfolio.about}</p>
        <p>
          I'm passionate about writing clean, maintainable code and creating 
          intuitive user experiences. I believe in continuous learning and 
          staying updated with the latest technologies.
        </p>
      </div>
    </section>
  )
}