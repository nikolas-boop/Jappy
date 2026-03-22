import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Child = sequelize.define('Child', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 255]
      }
    },
    pin: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'children',
    timestamps: true,
    underscored: true
  })

  return Child
}
