import { Badge, ChildBadge, ActivityLog, Bones, sequelize } from '../models/index.js'

// ============================================
// GET ALL BADGES FOR A CHILD
// ============================================
export const getBadges = async (req, res) => {
  try {
    const { childId } = req.params

    // Get or create child badges
    const allBadges = await Badge.findAll()

    const childBadges = []
    for (const badge of allBadges) {
      let childBadge = await ChildBadge.findOne({
        where: { childId, badgeId: badge.id }
      })

      if (!childBadge) {
        childBadge = await ChildBadge.create({
          childId,
          badgeId: badge.id,
          isUnlocked: false
        })
      }

      childBadges.push({
        id: badge.id,
        name: badge.name,
        description: badge.description,
        condition: badge.conditionType,
        conditionValue: badge.conditionValue,
        rewardBones: badge.rewardBones,
        isUnlocked: childBadge.isUnlocked,
        unlockedAt: childBadge.unlockedAt,
        iconUrl: badge.iconUrl
      })
    }

    res.json(childBadges)
  } catch (error) {
    console.error('Error getting badges:', error)
    res.status(500).json({ error: 'Fehler beim Abrufen der Badges' })
  }
}

// ============================================
// CHECK & UNLOCK BADGES (Internal)
// ============================================
export const checkBadges = async (childId) => {
  try {
    const allBadges = await Badge.findAll()

    for (const badge of allBadges) {
      const childBadge = await ChildBadge.findOne({
        where: { childId, badgeId: badge.id }
      })

      if (!childBadge?.isUnlocked) {
        // Check condition based on type
        let shouldUnlock = false

        if (badge.conditionType === 'walk_count') {
          // Count walk tasks
          const count = await sequelize.models.ActivityLog.count({
            where: {
              childId,
              activityType: 'task_completed',
              details: sequelize.where(
                sequelize.fn('JSON_EXTRACT', sequelize.col('details'), '$.taskType'),
                'walk'
              )
            }
          })
          shouldUnlock = count >= badge.conditionValue
        }

        if (badge.conditionType === 'total_bones') {
          const bones = await sequelize.models.Bones.findOne({
            where: { childId }
          })
          shouldUnlock = bones?.amount >= badge.conditionValue
        }

        if (badge.conditionType === 'games_completed') {
          const count = await sequelize.models.ActivityLog.count({
            where: {
              childId,
              activityType: 'minigame_completed'
            }
          })
          shouldUnlock = count >= badge.conditionValue
        }

        if (shouldUnlock && childBadge) {
          childBadge.isUnlocked = true
          childBadge.unlockedAt = new Date()
          await childBadge.save()

          // Award bones
          const bones = await sequelize.models.Bones.findOne({
            where: { childId }
          })
          bones.amount += badge.rewardBones
          await bones.save()

          // Log activity
          await ActivityLog.create({
            childId,
            activityType: 'badge_unlocked',
            details: { badgeName: badge.name, reward: badge.rewardBones }
          })
        }
      }
    }
  } catch (error) {
    console.error('Error checking badges:', error)
  }
}

export default { getBadges, checkBadges }
