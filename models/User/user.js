const Sequelize = require('sequelize');
const dbSequelizer = require('../../db_config/db');
const bcrypt = require('bcrypt');

const User = dbSequelizer.define(
  'users',
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: 'user_id',
    },
    user_type: {
      type: Sequelize.ENUM,
      values: ['admin', 'customer'],
      default: 'customer',
      allowNull: false,
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contact_no: {
      type: Sequelize.STRING(15),
      allowNull: false,
      unique: true,
    },
    username: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      //   set(value) {
      //     this.setDataValue('password', bcrypt.hashSync(value, 12));
      //   },
      validate: {
        isLongEnough: function (val) {
          if (val.length < 7) {
            throw new Error('Please choose a longer password');
          }
        },
      },
    },
    logged_in: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    //no association to dealer, client or user is possible for this construct
  },
  {
    freezeTableName: true,
  },
);

module.exports = User;
