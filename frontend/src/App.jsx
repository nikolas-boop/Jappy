import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Pages (werden später implementiert)
import Home from './pages/Home'

function App() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-pink-100">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Weitere Routes werden hinzugefügt */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
