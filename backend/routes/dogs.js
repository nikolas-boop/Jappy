import { Router } from 'express'
import * as dogController from '../controllers/dogController.js'

const router = Router()

/**
 * POST /api/dogs
 * Create new dog for child
 */
router.post('/', dogController.createDog)

/**
 * GET /api/dogs/breeds
 * Get available dog breeds
 */
router.get('/breeds', dogController.getBreeds)

/**
 * GET /api/dogs/:dogId
 * Get dog details and state
 */
router.get('/:dogId', dogController.getDog)

/**
 * PUT /api/dogs/:dogId
 * Update dog state
 */
router.put('/:dogId', dogController.updateDog)

export default router
