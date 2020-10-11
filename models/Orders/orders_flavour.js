const Sequelize = require('sequelize');
const sequelize = require('../../db_config/db');

const orderFlavour = sequelize.define(
  'orderFlavour',
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

module.exports = orderFlavour;
