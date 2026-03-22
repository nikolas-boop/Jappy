import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const ActivityLog = sequelize.define('ActivityLog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    childId: {
      type: DataTypes.INTEGER,
      field: 'child_id'
    },
    dogId: {
      type: DataTypes.INTEGER,
      field: 'dog_id'
    },
    activityType: {
      type: DataTypes.STRING(100),
      field: 'activity_type'
    },
    details: {
      type: DataTypes.JSON
    }
  }, {
    tableName: 'activity_log',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
  })

  return ActivityLog
}
