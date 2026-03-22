import { Bones } from '../models/index.js'

// ============================================
// GET BONES BALANCE
// ============================================
export const getBones = async (req, res) => {
  try {
    const { childId } = req.params

    const bones = await Bones.findOne({ where: { childId } })
    if (!bones) {
      return res.status(404).json({ error: 'Kind nicht gefunden' })
    }

    res.json({
      childId,
      amount: bones.amount
    })
  } catch (error) {
    console.error('Error getting bones:', error)
    res.status(500).json({ error: 'Fehler beim Abrufen der Knochen' })
  }
}

// ============================================
// UPDATE BONES (Internal Use)
// ============================================
export const updateBones = async (req, res) => {
  try {
    const { childId } = req.params
    const { amount, operation } = req.body

    if (!amount || !operation) {
      return res.status(400).json({ error: 'amount und operation erforderlich' })
    }

    const bones = await Bones.findOne({ where: { childId } })
    if (!bones) {
      return res.status(404).json({ error: 'Kind nicht gefunden' })
    }

    if (operation === 'add') {
      bones.amount += amount
    } else if (operation === 'subtract') {
      if (bones.amount < amount) {
        return res.status(400).json({ error: 'Nicht genug Knochen' })
      }
      bones.amount -= amount
    } else {
      return res.status(400).json({ error: 'Ungültige Operation' })
    }

    await bones.save()

    res.json({
      success: true,
      amount: bones.amount
    })
  } catch (error) {
    console.error('Error updating bones:', error)
    res.status(500).json({ error: 'Fehler beim Aktualisieren der Knochen' })
  }
}

export default { getBones, updateBones }
