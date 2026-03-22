import { sequelize, ShopItem, Badge } from '../models/index.js'

async function seedDatabase() {
  try {
    await sequelize.sync({ alter: true })

    console.log('🌱 Seeding database...')

    // ============================================
    // SHOP ITEMS
    // ============================================
    const shopItemsCount = await ShopItem.count()
    if (shopItemsCount === 0) {
      const shopItems = [
        { name: 'Tennisball', type: 'toy', cost: 50, imageUrl: '/images/shop/ball.png', description: 'Ein bunter Tennisball zum Spielen' },
        { name: 'Kaustock', type: 'toy', cost: 75, imageUrl: '/images/shop/chew.png', description: 'Kauspielzeug aus Gummi' },
        { name: 'Frisbee', type: 'toy', cost: 60, imageUrl: '/images/shop/frisbee.png', description: 'Kunststoff-Frisbee für Hunde' },
        { name: 'Rotes Halstuch', type: 'collar', cost: 100, imageUrl: '/images/shop/red-collar.png', description: 'Buntes Halstuch für deinen Hund' },
        { name: 'Blaue Leine', type: 'leash', cost: 150, imageUrl: '/images/shop/blue-leash.png', description: 'Sichere Leine für Spaziergänge' },
        { name: 'Weiches Hundebett', type: 'bed', cost: 300, imageUrl: '/images/shop/bed.png', description: 'Gemütliches Bett zum Ausruhen' },
        { name: 'Hundeleckerlies', type: 'treat', cost: 40, imageUrl: '/images/shop/treats.png', description: 'Leckere Hundekekse' }
      ]

      await ShopItem.bulkCreate(shopItems)
      console.log(`✓ Created ${shopItems.length} shop items`)
    }

    // ============================================
    // BADGES
    // ============================================
    const badgesCount = await Badge.count()
    if (badgesCount === 0) {
      const badges = [
        {
          name: 'Hundeflüsterer',
          description: 'Gassi gehen 5x absolviert',
          conditionType: 'walk_count',
          conditionValue: 5,
          rewardBones: 50,
          iconUrl: '/images/badges/walker.png'
        },
        {
          name: 'Gütiger Fütter',
          description: '50 Knochen verdient',
          conditionType: 'total_bones',
          conditionValue: 50,
          rewardBones: 75,
          iconUrl: '/images/badges/feeder.png'
        },
        {
          name: 'Spielbegeistert',
          description: '3 Mini-Games abgeschlossen',
          conditionType: 'games_completed',
          conditionValue: 3,
          rewardBones: 60,
          iconUrl: '/images/badges/gamer.png'
        },
        {
          name: 'Shopper',
          description: '3 Items im Shop gekauft',
          conditionType: 'items_bought',
          conditionValue: 3,
          rewardBones: 100,
          iconUrl: '/images/badges/shopper.png'
        },
        {
          name: '7-Tage-Strähne',
          description: '7 Tage hintereinander mindestens 1 Aufgabe',
          conditionType: 'daily_streak',
          conditionValue: 7,
          rewardBones: 200,
          iconUrl: '/images/badges/streak.png'
        }
      ]

      await Badge.bulkCreate(badges)
      console.log(`✓ Created ${badges.length} badges`)
    }

    console.log('✅ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
