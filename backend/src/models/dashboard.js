'use strict';

module.exports = (sequelize, DataTypes) => {
  const Dashboard = sequelize.define('dashboard', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    url: Sequelize.STRING
    layout: Sequelize.JSON
  });

  Dashboard.associate = function(models) {
    Dashboard.belongsToMany(User, {through: 'dashboard_user');
    Dashboard.hasMany(Widget);
  };
};
