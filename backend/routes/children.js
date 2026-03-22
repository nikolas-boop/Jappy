import { Router } from 'express'

const router = Router()

/**
 * POST /api/children
 * Create new child profile
 */
router.post('/', (req, res) => {
  res.json({ message: 'Child endpoint' })
})

/**
 * GET /api/children/:childId
 * Get child profile details
 */
router.get('/:childId', (req, res) => {
  res.json({ message: 'Get child endpoint' })
})

export default router
