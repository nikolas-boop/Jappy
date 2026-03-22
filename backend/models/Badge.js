import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Badge = sequelize.define('Badge', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    conditionType: {
      type: DataTypes.STRING(100),
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
    },
    iconUrl: {
      type: DataTypes.STRING(500),
      field: 'icon_url'
    }
  }, {
    tableName: 'badges',
    timestamps: true,
    underscored: true
  })

  return Badge
}
