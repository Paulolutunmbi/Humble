import { Hero } from './components/hero'
import { Navigation } from './components/Navigation'
import { About } from './components/About'
import './App.css'

function App() {
  return (
    <div>
      <Navigation />
      <Hero />
      <About />
      {/* Projects, Skills, and Contact coming next */}
    </div>
  )
}

export default App