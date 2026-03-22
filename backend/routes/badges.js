import { Router } from 'express'
import * as badgeController from '../controllers/badgeController.js'

const router = Router()

/**
 * GET /api/badges/:childId
 * Get all badges for child
 */
router.get('/:childId', badgeController.getBadges)

export default router
