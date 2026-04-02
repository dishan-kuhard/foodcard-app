import { useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import SavedPage from './pages/SavedPage'

function savedReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const item = action.payload
      if (!item || !item.code) return state
      if (state.some((p) => p.code === item.code)) return state
      return [...state, item]
    }
    case 'REMOVE': {
      const code = action.payload?.code
      if (!code) return state
      return state.filter((p) => p.code !== code)
    }
    default:
      return state
  }
}

function App() {
  const [saved, dispatch] = useReducer(savedReducer, [])

  return (
    <div>
      <NavBar savedCount={saved.length} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/product/:barcode"
            element={<DetailPage saved={saved} dispatch={dispatch} />}
          />
          <Route
            path="/saved"
            element={<SavedPage saved={saved} dispatch={dispatch} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App