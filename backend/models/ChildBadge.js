import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const ChildBadge = sequelize.define('ChildBadge', {
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
    badgeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'badge_id'
    },
    isUnlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_unlocked'
    },
    unlockedAt: {
      type: DataTypes.DATE,
      field: 'unlocked_at'
    }
  }, {
    tableName: 'child_badges',
    timestamps: true,
    underscored: true
  })

  return ChildBadge
}
