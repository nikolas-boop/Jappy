import { Router } from 'express'

const router = Router()

/**
 * GET /api/badges/:childId
 * Get all badges for child
 */
router.get('/:childId', (req, res) => {
  res.json({ message: 'Badges endpoint' })
})

export default router
