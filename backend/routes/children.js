import { Router } from 'express'
import * as childController from '../controllers/childController.js'

const router = Router()

/**
 * POST /api/children
 * Create new child profile
 */
router.post('/', childController.createChild)

/**
 * POST /api/children/login
 * Login with name and PIN
 */
router.post('/login', childController.loginChild)

/**
 * GET /api/children
 * Get all children names (for selection)
 */
router.get('/', childController.getAllChildren)

/**
 * GET /api/children/:childId
 * Get child profile details
 */
router.get('/:childId', childController.getChildProfile)

/**
 * POST /api/children/logout
 * Logout child
 */
router.post('/logout', childController.logoutChild)

export default router
