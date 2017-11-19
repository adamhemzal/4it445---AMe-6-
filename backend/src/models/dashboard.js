'use strict';

module.exports = (sequelize, DataTypes) => {
  const Dashboard = sequelize.define('Dashboard', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    layout: DataTypes.JSON
  });

  Dashboard.associate = function(models) {
    Dashboard.belongsToMany(models.User, {through: 'dashboard_user'});
    Dashboard.hasMany(models.Widget);
  };

  return Dashboard;
};
