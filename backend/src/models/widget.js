'use strict';

module.exports = (sequelize, DataTypes) => {
  const Widget = sequelize.define('widget', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    settings: Sequelize.JSON
  });
};
