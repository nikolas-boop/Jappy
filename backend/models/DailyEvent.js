import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const DailyEvent = sequelize.define('DailyEvent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    eventName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'event_name'
    },
    description: {
      type: DataTypes.TEXT
    },
    rewardBones: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'reward_bones'
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'event_date'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_active'
    }
  }, {
    tableName: 'daily_events',
    timestamps: true,
    underscored: true
  })

  return DailyEvent
}
