import sequelize from '../config/database.js'
import ChildModel from './Child.js'
import DogModel from './Dog.js'
import BonesModel from './Bones.js'
import TaskModel from './Task.js'
import ShopItemModel from './ShopItem.js'
import BadgeModel from './Badge.js'
import InventoryModel from './Inventory.js'
import ChildBadgeModel from './ChildBadge.js'
import DailyEventModel from './DailyEvent.js'
import ActivityLogModel from './ActivityLog.js'

// ============================================
// MODELS
// ============================================

const Child = ChildModel(sequelize)
const Dog = DogModel(sequelize)
const Bones = BonesModel(sequelize)
const Task = TaskModel(sequelize)
const ShopItem = ShopItemModel(sequelize)
const Badge = BadgeModel(sequelize)
const Inventory = InventoryModel(sequelize)
const ChildBadge = ChildBadgeModel(sequelize)
const DailyEvent = DailyEventModel(sequelize)
const ActivityLog = ActivityLogModel(sequelize)

// ============================================
// ASSOCIATIONS
// ============================================

// Child ↔ Dog (1:1)
Child.hasOne(Dog, { foreignKey: 'childId', onDelete: 'CASCADE' })
Dog.belongsTo(Child, { foreignKey: 'childId' })

// Child ↔ Bones (1:1)
Child.hasOne(Bones, { foreignKey: 'childId', onDelete: 'CASCADE' })
Bones.belongsTo(Child, { foreignKey: 'childId' })

// Dog ↔ Task (1:M)
Dog.hasMany(Task, { foreignKey: 'dogId', onDelete: 'CASCADE' })
Task.belongsTo(Dog, { foreignKey: 'dogId' })

// Child ↔ Inventory (1:M)
Child.hasMany(Inventory, { foreignKey: 'childId', onDelete: 'CASCADE' })
Inventory.belongsTo(Child, { foreignKey: 'childId' })

// ShopItem ↔ Inventory (1:M)
ShopItem.hasMany(Inventory, { foreignKey: 'shopItemId', onDelete: 'CASCADE' })
Inventory.belongsTo(ShopItem, { foreignKey: 'shopItemId' })

// Child ↔ ChildBadge (1:M)
Child.hasMany(ChildBadge, { foreignKey: 'childId', onDelete: 'CASCADE' })
ChildBadge.belongsTo(Child, { foreignKey: 'childId' })

// Badge ↔ ChildBadge (1:M)
Badge.hasMany(ChildBadge, { foreignKey: 'badgeId', onDelete: 'CASCADE' })
ChildBadge.belongsTo(Badge, { foreignKey: 'badgeId' })

// Child ↔ ActivityLog (1:M)
Child.hasMany(ActivityLog, { foreignKey: 'childId', onDelete: 'CASCADE' })
ActivityLog.belongsTo(Child, { foreignKey: 'childId' })

// Dog ↔ ActivityLog (1:M)
Dog.hasMany(ActivityLog, { foreignKey: 'dogId', onDelete: 'CASCADE' })
ActivityLog.belongsTo(Dog, { foreignKey: 'dogId' })

// ============================================
// DATABASE SYNC & EXPORT
// ============================================

export {
  sequelize,
  Child,
  Dog,
  Bones,
  Task,
  ShopItem,
  Badge,
  Inventory,
  ChildBadge,
  DailyEvent,
  ActivityLog
}
