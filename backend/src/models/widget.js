'use strict';

module.exports = (sequelize, DataTypes) => {
	const Widget = sequelize.define('widget', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: DataTypes.STRING,
		settings: DataTypes.JSON,
	});

	return Widget;
};
