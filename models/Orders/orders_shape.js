const Sequelize = require('sequelize');
const sequelize = require('../../db_config/db');

const ordershape = sequelize.define(
  'orderShape',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    underscored: true,
  },
);

module.exports = ordershape;
