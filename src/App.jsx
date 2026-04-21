import { Hero } from './components/Hero'
import { Navigation } from './components/Navigation'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CursorFollower } from './components/CursorFollower'
import './App.css'

function App() {
  return (
    <div className="app">
      <CursorFollower />
      <Navigation />
      <main className="app-main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App