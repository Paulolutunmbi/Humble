import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <h1>Counter App</h1>
      
      <div className="counter-display">
        <p className="label">Current count</p>
        <p className="number">{count}</p>
      </div>

      <div className="button-group">
        <button onClick={() => setCount(count - 1)}>
          Decrease
        </button>
        <button onClick={() => setCount(count + 1)}>
          Increase
        </button>
      </div>

      <button 
        className="reset-btn"
        onClick={() => setCount(0)}
      >
        Reset
      </button>
    </div>
  )
}

export default App