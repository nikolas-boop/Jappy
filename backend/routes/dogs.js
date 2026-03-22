import { Router } from 'express'

const router = Router()

/**
 * POST /api/dogs
 * Create new dog for child
 */
router.post('/', (req, res) => {
  res.json({ message: 'Create dog endpoint' })
})

/**
 * GET /api/dogs/:dogId
 * Get dog details and state
 */
router.get('/:dogId', (req, res) => {
  res.json({ message: 'Get dog endpoint' })
})

export default router
