import { Dog, Bones, ActivityLog } from '../models/index.js'

const DOG_BREEDS = [
  'Labrador', 'Golden Retriever', 'Beagle', 'Dachshund',
  'Poodle', 'German Shepherd', 'Bulldog', 'Husky'
]

// ============================================
// CREATE DOG
// ============================================
export const createDog = async (req, res) => {
  try {
    const { childId, breed, dogName } = req.body

    if (!childId || !breed || !dogName) {
      return res.status(400).json({ error: 'childId, Rasse und Name erforderlich' })
    }

    if (!DOG_BREEDS.includes(breed)) {
      return res.status(400).json({ error: 'Ungültige Rasse' })
    }

    // Check if child already has a dog
    const existingDog = await Dog.findOne({ where: { childId } })
    if (existingDog) {
      return res.status(409).json({ error: 'Kind hat bereits einen Hund' })
    }

    const dog = await Dog.create({
      childId,
      breed,
      dogName,
      visualState: 'baby',
      hunger: 50,
      happiness: 50,
      health: 100,
      level: 1
    })

    // Log activity
    await ActivityLog.create({
      childId,
      dogId: dog.id,
      activityType: 'dog_created',
      details: { breed, dogName }
    })

    res.status(201).json({
      success: true,
      dog: {
        id: dog.id,
        dogName: dog.dogName,
        breed: dog.breed,
        level: dog.level,
        hunger: dog.hunger,
        happiness: dog.happiness,
        health: dog.health,
        visualState: dog.visualState
      }
    })
  } catch (error) {
    console.error('Error creating dog:', error)
    res.status(500).json({ error: 'Fehler beim Erstellen des Hundes' })
  }
}

// ============================================
// GET DOG STATE
// ============================================
export const getDog = async (req, res) => {
  try {
    const { dogId } = req.params

    const dog = await Dog.findByPk(dogId)
    if (!dog) {
      return res.status(404).json({ error: 'Hund nicht gefunden' })
    }

    res.json({
      id: dog.id,
      dogName: dog.dogName,
      breed: dog.breed,
      level: dog.level,
      hunger: dog.hunger,
      happiness: dog.happiness,
      health: dog.health,
      visualState: dog.visualState
    })
  } catch (error) {
    console.error('Error getting dog:', error)
    res.status(500).json({ error: 'Fehler beim Abrufen des Hundes' })
  }
}

// ============================================
// UPDATE DOG STATE
// ============================================
export const updateDog = async (req, res) => {
  try {
    const { dogId } = req.params
    const { hunger, happiness, health, visualState, level } = req.body

    const dog = await Dog.findByPk(dogId)
    if (!dog) {
      return res.status(404).json({ error: 'Hund nicht gefunden' })
    }

    // Validate ranges
    if (hunger !== undefined && (hunger < 0 || hunger > 100)) {
      return res.status(400).json({ error: 'Hunger muss zwischen 0 und 100 liegen' })
    }

    if (happiness !== undefined && (happiness < 0 || happiness > 100)) {
      return res.status(400).json({ error: 'Glück muss zwischen 0 und 100 liegen' })
    }

    if (health !== undefined && (health < 0 || health > 100)) {
      return res.status(400).json({ error: 'Gesundheit muss zwischen 0 und 100 liegen' })
    }

    // Update only provided fields
    if (hunger !== undefined) dog.hunger = hunger
    if (happiness !== undefined) dog.happiness = happiness
    if (health !== undefined) dog.health = health
    if (visualState !== undefined) dog.visualState = visualState
    if (level !== undefined) dog.level = level

    await dog.save()

    res.json({
      success: true,
      dog: {
        id: dog.id,
        dogName: dog.dogName,
        hunger: dog.hunger,
        happiness: dog.happiness,
        health: dog.health,
        visualState: dog.visualState,
        level: dog.level
      }
    })
  } catch (error) {
    console.error('Error updating dog:', error)
    res.status(500).json({ error: 'Fehler beim Aktualisieren des Hundes' })
  }
}

// ============================================
// GET AVAILABLE BREEDS
// ============================================
export const getBreeds = async (req, res) => {
  res.json(DOG_BREEDS)
}

export default { createDog, getDog, updateDog, getBreeds }
