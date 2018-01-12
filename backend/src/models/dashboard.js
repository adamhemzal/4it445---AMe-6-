'use strict';

module.exports = (sequelize, DataTypes) => {
  const Dashboard = sequelize.define('dashboard', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    layoutId: DataTypes.STRING,
    layout: DataTypes.JSON
  });

  Dashboard.associate = function(models) {
    Dashboard.belongsToMany(models.user, {through: 'dashboard_user'});
    Dashboard.hasMany(models.widget);
  };

  return Dashboard;
};
