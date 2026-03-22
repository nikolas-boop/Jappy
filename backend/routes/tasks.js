import { Router } from 'express'

const router = Router()

/**
 * POST /api/tasks/:dogId/complete
 * Mark task as completed
 */
router.post('/:dogId/complete', (req, res) => {
  res.json({ message: 'Complete task endpoint' })
})

/**
 * GET /api/tasks/:dogId
 * Get available tasks for dog
 */
router.get('/:dogId', (req, res) => {
  res.json({ message: 'Get tasks endpoint' })
})

export default router
