import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

// Child Model
const Child = sequelize.define('Child', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  pin: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'children',
  timestamps: true,
  underscored: true
})

// Dog Model
const Dog = sequelize.define('Dog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dogName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'dog_name'
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  hunger: {
    type: DataTypes.INTEGER,
    defaultValue: 50
  },
  happiness: {
    type: DataTypes.INTEGER,
    defaultValue: 50
  },
  health: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  visualState: {
    type: DataTypes.STRING,
    defaultValue: 'baby',
    field: 'visual_state'
  }
}, {
  tableName: 'dogs',
  timestamps: true,
  underscored: true
})

// Bones Model (Currency)
const Bones = sequelize.define('Bones', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'bones',
  timestamps: false
})

// ShopItem Model
const ShopItem = sequelize.define('ShopItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('toy', 'collar', 'leash', 'bed', 'treat', 'other'),
    allowNull: false
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    field: 'image_url'
  },
  description: {
    type: DataTypes.TEXT
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'shop_items',
  timestamps: true,
  underscored: true
})

// Badge Model
const Badge = sequelize.define('Badge', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  },
  conditionType: {
    type: DataTypes.STRING,
    field: 'condition_type'
  },
  conditionValue: {
    type: DataTypes.INTEGER,
    field: 'condition_value'
  },
  rewardBones: {
    type: DataTypes.INTEGER,
    defaultValue: 50,
    field: 'reward_bones'
  }
}, {
  tableName: 'badges',
  timestamps: true,
  underscored: true
})

// Associations
Child.hasOne(Dog, { foreignKey: 'childId' })
Dog.belongsTo(Child, { foreignKey: 'childId' })

Child.hasOne(Bones, { foreignKey: 'childId' })
Bones.belongsTo(Child, { foreignKey: 'childId' })

export { Child, Dog, Bones, ShopItem, Badge, sequelize }
