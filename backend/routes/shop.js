import { Router } from 'express'

const router = Router()

/**
 * GET /api/shop
 * Get all shop items
 */
router.get('/', (req, res) => {
  res.json({ message: 'Shop items endpoint' })
})

/**
 * POST /api/shop/buy
 * Purchase item
 */
router.post('/buy', (req, res) => {
  res.json({ message: 'Buy item endpoint' })
})

export default router
