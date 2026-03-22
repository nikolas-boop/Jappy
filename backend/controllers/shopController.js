import { ShopItem, Inventory, Bones, ActivityLog } from '../models/index.js'

// ============================================
// GET SHOP ITEMS
// ============================================
export const getShopItems = async (req, res) => {
  try {
    const items = await ShopItem.findAll({
      where: { isActive: true },
      order: [['type', 'ASC'], ['name', 'ASC']]
    })

    const grouped = {
      toy: items.filter(i => i.type === 'toy'),
      collar: items.filter(i => i.type === 'collar'),
      leash: items.filter(i => i.type === 'leash'),
      bed: items.filter(i => i.type === 'bed'),
      treat: items.filter(i => i.type === 'treat'),
      other: items.filter(i => i.type === 'other')
    }

    res.json(grouped)
  } catch (error) {
    console.error('Error getting shop items:', error)
    res.status(500).json({ error: 'Fehler beim Abrufen der Shop-Items' })
  }
}

// ============================================
// BUY ITEM
// ============================================
export const buyItem = async (req, res) => {
  try {
    const { childId, shopItemId } = req.body

    if (!childId || !shopItemId) {
      return res.status(400).json({ error: 'childId und shopItemId erforderlich' })
    }

    // Get shop item
    const shopItem = await ShopItem.findByPk(shopItemId)
    if (!shopItem) {
      return res.status(404).json({ error: 'Item nicht gefunden' })
    }

    if (!shopItem.isActive) {
      return res.status(400).json({ error: 'Dieses Item ist nicht verfügbar' })
    }

    // Get bones
    const bones = await Bones.findOne({ where: { childId } })
    if (!bones) {
      return res.status(404).json({ error: 'Kind nicht gefunden' })
    }

    // Check if enough bones
    if (bones.amount < shopItem.cost) {
      return res.status(400).json({
        error: `Nicht genug Knochen. Du brauchst ${shopItem.cost}, hast aber ${bones.amount}`
      })
    }

    // Deduct bones
    bones.amount -= shopItem.cost
    await bones.save()

    // Add to inventory (or update quantity)
    let inventoryItem = await Inventory.findOne({
      where: { childId, shopItemId }
    })

    if (inventoryItem) {
      inventoryItem.quantity += 1
      await inventoryItem.save()
    } else {
      inventoryItem = await Inventory.create({
        childId,
        shopItemId,
        quantity: 1
      })
    }

    // Log activity
    await ActivityLog.create({
      childId,
      activityType: 'item_purchased',
      details: { itemId: shopItemId, itemName: shopItem.name, cost: shopItem.cost }
    })

    res.json({
      success: true,
      message: `${shopItem.name} gekauft!`,
      bonusDeducted: shopItem.cost,
      remainingBones: bones.amount,
      item: {
        id: shopItem.id,
        name: shopItem.name,
        type: shopItem.type
      }
    })
  } catch (error) {
    console.error('Error buying item:', error)
    res.status(500).json({ error: 'Fehler beim Kauf des Items' })
  }
}

// ============================================
// GET INVENTORY
// ============================================
export const getInventory = async (req, res) => {
  try {
    const { childId } = req.params

    const inventoryItems = await Inventory.findAll({
      where: { childId },
      include: [{ model: ShopItem, attributes: ['id', 'name', 'type', 'imageUrl'] }]
    })

    const inventory = inventoryItems.map(inv => ({
      inventoryId: inv.id,
      shopItem: {
        id: inv.ShopItem.id,
        name: inv.ShopItem.name,
        type: inv.ShopItem.type,
        imageUrl: inv.ShopItem.imageUrl
      },
      quantity: inv.quantity,
      purchasedAt: inv.purchasedAt
    }))

    res.json(inventory)
  } catch (error) {
    console.error('Error getting inventory:', error)
    res.status(500).json({ error: 'Fehler beim Abrufen des Inventars' })
  }
}

export default { getShopItems, buyItem, getInventory }
