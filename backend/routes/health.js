import { Router } from 'express'

const router = Router()

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'Happy Dog API is healthy'
  })
})

export default router
