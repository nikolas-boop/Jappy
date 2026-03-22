import { Router } from 'express'
import * as shopController from '../controllers/shopController.js'

const router = Router()

/**
 * GET /api/shop
 * Get all shop items
 */
router.get('/', shopController.getShopItems)

/**
 * POST /api/shop/buy
 * Purchase item
 */
router.post('/buy', shopController.buyItem)

/**
 * GET /api/shop/inventory/:childId
 * Get child's inventory
 */
router.get('/inventory/:childId', shopController.getInventory)

export default router
