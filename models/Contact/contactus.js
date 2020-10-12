const Sequelize = require('sequelize');
const dbSequelizer = require('../../db_config/db');
const bcrypt = require('bcrypt');

const User = dbSequelizer.define(
  'contactus',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
    },
    contact_no: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    //no association to dealer, client or user is possible for this construct
  },
  {
    freezeTableName: true,
  },
);

module.exports = User;
