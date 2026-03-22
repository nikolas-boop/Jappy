import { Router } from 'express'
import * as taskController from '../controllers/taskController.js'

const router = Router()

/**
 * GET /api/tasks/:dogId
 * Get available tasks for dog
 */
router.get('/:dogId', taskController.getTasks)

/**
 * POST /api/tasks/:dogId/complete
 * Mark task as completed
 */
router.post('/:dogId/complete', taskController.completeTask)

export default router
