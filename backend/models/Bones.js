import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Bones = sequelize.define('Bones', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    childId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: 'child_id'
    },
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 }
    }
  }, {
    tableName: 'bones',
    timestamps: false
  })

  return Bones
}
