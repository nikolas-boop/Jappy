import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import CreateProfile from './pages/CreateProfile'

function App() {
  const [currentChild, setCurrentChild] = useState(null)

  const handleLoginSuccess = (child) => {
    setCurrentChild(child)
  }

  const handleCreateSuccess = (child) => {
    setCurrentChild(child)
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-pink-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/create-profile" element={<CreateProfile onCreateSuccess={handleCreateSuccess} />} />
          {/* Dog Selection und weitere Routes werden später hinzugefügt */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
