import { Hero } from './components/hero'
import { Navigation } from './components/Navigation'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import './App.css'

function App() {
  return (
    <div>
      <Navigation />
      <About />
      <Hero />
      <Projects />
      <Skills />
      {/* Contact coming next */}
    </div>
  )
}

export default App