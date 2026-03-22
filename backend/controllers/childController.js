import { Child, Dog, Bones, ActivityLog } from '../models/index.js'

// ============================================
// CREATE CHILD PROFILE
// ============================================
export const createChild = async (req, res) => {
  try {
    const { name, pin } = req.body

    if (!name || !pin) {
      return res.status(400).json({ error: 'Name und PIN erforderlich' })
    }

    if (pin.length < 4) {
      return res.status(400).json({ error: 'PIN muss mindestens 4 Ziffern haben' })
    }

    // Check if child already exists
    const existingChild = await Child.findOne({ where: { name } })
    if (existingChild) {
      return res.status(409).json({ error: 'Dieser Name existiert bereits' })
    }

    // Create child
    const child = await Child.create({ name, pin })

    // Initialize bones for this child
    await Bones.create({ childId: child.id, amount: 0 })

    res.status(201).json({
      success: true,
      childId: child.id,
      name: child.name,
      message: 'Profil erfolgreich erstellt'
    })
  } catch (error) {
    console.error('Error creating child:', error)
    res.status(500).json({ error: 'Fehler beim Erstellen des Profils' })
  }
}

// ============================================
// LOGIN / AUTHENTICATE CHILD
// ============================================
export const loginChild = async (req, res) => {
  try {
    const { name, pin } = req.body

    if (!name || !pin) {
      return res.status(400).json({ error: 'Name und PIN erforderlich' })
    }

    // Find child by name
    const child = await Child.findOne({ where: { name } })
    if (!child) {
      return res.status(401).json({ error: 'Kind nicht gefunden' })
    }

    // Check PIN (simple comparison, not hashed)
    if (child.pin !== pin) {
      return res.status(401).json({ error: 'PIN falsch' })
    }

    // Set session
    req.session.childId = child.id
    req.session.childName = child.name

    res.json({
      success: true,
      childId: child.id,
      name: child.name,
      message: 'Anmeldung erfolgreich'
    })
  } catch (error) {
    console.error('Error logging in child:', error)
    res.status(500).json({ error: 'Fehler beim Anmelden' })
  }
}

// ============================================
// GET CHILD PROFILE
// ============================================
export const getChildProfile = async (req, res) => {
  try {
    const { childId } = req.params

    const child = await Child.findByPk(childId, {
      include: [
        { model: Dog },
        { model: Bones }
      ]
    })

    if (!child) {
      return res.status(404).json({ error: 'Kind nicht gefunden' })
    }

    res.json({
      id: child.id,
      name: child.name,
      dog: child.Dog,
      bones: child.Bones?.amount || 0,
      createdAt: child.createdAt
    })
  } catch (error) {
    console.error('Error getting child profile:', error)
    res.status(500).json({ error: 'Fehler beim Abrufen des Profils' })
  }
}

// ============================================
// GET ALL CHILD NAMES (for selection on login)
// ============================================
export const getAllChildren = async (req, res) => {
  try {
    const children = await Child.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    })

    res.json(children)
  } catch (error) {
    console.error('Error getting children:', error)
    res.status(500).json({ error: 'Fehler beim Abrufen der Profile' })
  }
}

// ============================================
// LOGOUT
// ============================================
export const logoutChild = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Fehler beim Abmelden' })
    }
    res.json({ success: true, message: 'Erfolgreich abgemeldet' })
  })
}
