'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: DataTypes.STRING,
    nickname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING
  });
  User.associate = function(models) {
    User.belongsToMany(models.dashboard, {through: 'dashboard_user'});
  };

  return User;
};
