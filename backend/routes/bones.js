import { Router } from 'express'
import * as bonesController from '../controllers/bonesController.js'

const router = Router()

/**
 * GET /api/bones/:childId
 * Get bone balance
 */
router.get('/:childId', bonesController.getBones)

/**
 * PUT /api/bones/:childId
 * Update bones (add/subtract)
 */
router.put('/:childId', bonesController.updateBones)

export default router
