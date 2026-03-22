import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'dog_id'
    },
    taskType: {
      type: DataTypes.ENUM('walk', 'feed', 'pet', 'play'),
      allowNull: false,
      field: 'task_type'
    },
    boneReward: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'bone_reward'
    },
    cooldownHours: {
      type: DataTypes.INTEGER,
      defaultValue: 24,
      field: 'cooldown_hours'
    },
    lastCompletedAt: {
      type: DataTypes.DATE,
      field: 'last_completed_at'
    }
  }, {
    tableName: 'tasks',
    timestamps: true,
    underscored: true
  })

  return Task
}
