import { Task, Dog, ActivityLog, Bones } from '../models/index.js'

const TASK_DEFINITIONS = {
  walk: { boneReward: 30, cooldownHours: 24, label: 'Gassi gehen' },
  feed: { boneReward: 20, cooldownHours: 24, label: 'Füttern' },
  pet: { boneReward: 5, cooldownHours: 0, label: 'Streicheln' },
  play: { boneReward: 10, cooldownHours: 2, label: 'Spielen' }
}

// ============================================
// GET AVAILABLE TASKS FOR A DOG
// ============================================
export const getTasks = async (req, res) => {
  try {
    const { dogId } = req.params

    const dog = await Dog.findByPk(dogId)
    if (!dog) {
      return res.status(404).json({ error: 'Hund nicht gefunden' })
    }

    const tasks = await Task.findAll({ where: { dogId } })

    const tasksWithStatus = tasks.map(task => {
      const now = new Date()
      const lastCompleted = task.lastCompletedAt ? new Date(task.lastCompletedAt) : null
      
      let canComplete = true
      let cooldownEndsAt = null

      if (task.cooldownHours > 0 && lastCompleted) {
        const cooldownMs = task.cooldownHours * 60 * 60 * 1000
        cooldownEndsAt = new Date(lastCompleted.getTime() + cooldownMs)
        canComplete = now > cooldownEndsAt
      }

      return {
        id: task.id,
        taskType: task.taskType,
        label: TASK_DEFINITIONS[task.taskType]?.label,
        boneReward: task.boneReward,
        cooldownHours: task.cooldownHours,
        canComplete,
        cooldownEndsAt,
        lastCompletedAt: task.lastCompletedAt
      }
    })

    res.json(tasksWithStatus)
  } catch (error) {
    console.error('Error getting tasks:', error)
    res.status(500).json({ error: 'Fehler beim Abrufen der Aufgaben' })
  }
}

// ============================================
// COMPLETE TASK
// ============================================
export const completeTask = async (req, res) => {
  try {
    const { dogId } = req.params
    const { taskType } = req.body

    if (!taskType || !TASK_DEFINITIONS[taskType]) {
      return res.status(400).json({ error: 'Ungültiger Aufgabentyp' })
    }

    const dog = await Dog.findByPk(dogId, { include: 'Child' })
    if (!dog) {
      return res.status(404).json({ error: 'Hund nicht gefunden' })
    }

    // Get or create task
    let task = await Task.findOne({ where: { dogId, taskType } })
    if (!task) {
      const taskDef = TASK_DEFINITIONS[taskType]
      task = await Task.create({
        dogId,
        taskType,
        boneReward: taskDef.boneReward,
        cooldownHours: taskDef.cooldownHours
      })
    }

    // Check cooldown
    const now = new Date()
    if (task.cooldownHours > 0 && task.lastCompletedAt) {
      const lastCompleted = new Date(task.lastCompletedAt)
      const cooldownMs = task.cooldownHours * 60 * 60 * 1000
      const cooldownEndsAt = new Date(lastCompleted.getTime() + cooldownMs)

      if (now < cooldownEndsAt) {
        const minutesRemaining = Math.ceil((cooldownEndsAt - now) / 60000)
        return res.status(429).json({
          error: `Diese Aufgabe ist noch nicht verfügbar. Warte noch ${minutesRemaining} Minuten.`
        })
      }
    }

    // Update task
    task.lastCompletedAt = now
    await task.save()

    // Add bones
    const reward = task.boneReward
    const bones = await Bones.findOne({ where: { childId: dog.childId } })
    bones.amount += reward
    await bones.save()

    // Update dog state
    dog.hunger = Math.min(100, dog.hunger + 10)
    dog.happiness = Math.min(100, dog.happiness + 15)
    await dog.save()

    // Log activity
    await ActivityLog.create({
      childId: dog.childId,
      dogId,
      activityType: 'task_completed',
      details: { taskType, reward }
    })

    res.json({
      success: true,
      message: `Aufgabe abgeschlossen! +${reward} Knochen`,
      bonesEarned: reward,
      totalBones: bones.amount,
      dogState: {
        hunger: dog.hunger,
        happiness: dog.happiness,
        health: dog.health
      }
    })
  } catch (error) {
    console.error('Error completing task:', error)
    res.status(500).json({ error: 'Fehler beim Ausführen der Aufgabe' })
  }
}

export default { getTasks, completeTask }
