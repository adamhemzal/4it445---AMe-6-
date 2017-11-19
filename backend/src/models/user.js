'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    type: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING
  });
  User.associate = function(models) {
    User.belongsToMany(Dashboard, {through: 'dashboard_user');
  };
};
