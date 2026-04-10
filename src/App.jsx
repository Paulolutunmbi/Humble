import { useState } from 'react'
import './App.css'

/**
 * App Component - A todo list management application
 * 
 * Manages a list of todos with the ability to add, toggle completion status, and delete items.
 * 
 * @component
 * @returns {JSX.Element} The rendered todo application with input field, add button, and todo list
 * 
 * @description
 * This component maintains three pieces of state:
 * - todos: Array of todo objects, each containing id, text, and completed status
 * - input: Current value of the input field
 * - nextId: Counter for generating unique todo IDs
 * 
 * The square brackets in `setTodos([...todos, newTodo])` represent the spread operator (`...`)
 * used to create a new array. This spreads all existing todos into a new array and appends
 * the newTodo at the end. This is done to create a new array reference (immutability),
 * which is required by React to properly detect state changes and re-render the component.
 * 
 * @example
 * // Usage in index.js or main.jsx
 * <App />
 */
function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [nextId, setNextId] = useState(1)

  // Add a new todo
  const addTodo = () => {
    if (input.trim() === '') return

    const newTodo = {
      id: nextId,
      text: input,
      completed: false
    }

    setTodos([...todos, newTodo])
    setInput('')
    setNextId(nextId + 1)
  }

  // Toggle todo completed state
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="container">
      <h1>My Todos</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos.length === 0 ? (
        <p className="empty-state">No todos yet. Add one to get started!</p>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className={todo.completed ? 'completed' : ''}>
                {todo.text}
              </span>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App