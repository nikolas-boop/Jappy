import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'

// Routen
import healthRouter from './routes/health.js'
import childrenRouter from './routes/children.js'
import dogsRouter from './routes/dogs.js'
import tasksRouter from './routes/tasks.js'
import shopRouter from './routes/shop.js'
import badgesRouter from './routes/badges.js'

const app = express()
const PORT = process.env.PORT || 3001

// ============================================
// Middleware
// ============================================

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}))

// Body Parser
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Cookie Parser
app.use(cookieParser())

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}))

// ============================================
// Routes
// ============================================

// Health Check
app.use('/api/health', healthRouter)

// API Routes
app.use('/api/children', childrenRouter)
app.use('/api/dogs', dogsRouter)
app.use('/api/tasks', tasksRouter)
app.use('/api/shop', shopRouter)
app.use('/api/badges', badgesRouter)

// ============================================
// Error Handling
// ============================================

app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Happy Dog API Server running on http://localhost:${PORT}`)
  console.log(`📡 CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`)
  console.log(`🗄️  Database: ${process.env.DB_NAME || 'happy_dog'}`)
  console.log(`✅ Status: Ready to accept requests`)
})

export default app
