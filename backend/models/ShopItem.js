import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const ShopItem = sequelize.define('ShopItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('toy', 'collar', 'leash', 'bed', 'treat', 'other'),
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 }
    },
    imageUrl: {
      type: DataTypes.STRING(500),
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

  return ShopItem
}
