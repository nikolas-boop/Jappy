import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Inventory = sequelize.define('Inventory', {
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
    shopItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'shop_item_id'
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: { min: 1 }
    }
  }, {
    tableName: 'inventory',
    timestamps: true,
    createdAt: 'purchased_at',
    updatedAt: false,
    underscored: true
  })

  return Inventory
}
