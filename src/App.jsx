import { useEffect, useState } from 'react'
import './App.css'

const  TODO_STORAGE_KEY = 'todos'

const loadTodos = () => {
  try {
    const storedTodos = localStorage.getItem(TODO_STORAGE_KEY)
    const parsedTodos = storedTodos ? JSON.parse(storedTodos) : []
    return Array.isArray(parsedTodos) ? parsedTodos : []
  } catch {
    return []
  }
}

function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [input, setInput] = useState('')
  const [nextId, setNextId] = useState(() => {
    const initialTodos = loadTodos()
    const maxId = initialTodos.reduce(
      (max, todo) => (Number.isFinite(todo.id) && todo.id > max ? todo.id : max),
      0
    )
    return maxId + 1
  })

  useEffect(() => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

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
          onKeyDown={handleKeyPress}
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