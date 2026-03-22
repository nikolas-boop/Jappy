import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Dog = sequelize.define('Dog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    childId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'child_id'
    },
    dogName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'dog_name'
    },
    breed: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: { min: 1, max: 100 }
    },
    hunger: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
      validate: { min: 0, max: 100 }
    },
    happiness: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
      validate: { min: 0, max: 100 }
    },
    health: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      validate: { min: 0, max: 100 }
    },
    visualState: {
      type: DataTypes.ENUM('baby', 'young', 'adult'),
      defaultValue: 'baby',
      field: 'visual_state'
    }
  }, {
    tableName: 'dogs',
    timestamps: true,
    underscored: true
  })

  return Dog
}
