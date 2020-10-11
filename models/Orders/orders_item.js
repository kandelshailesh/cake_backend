const Sequelize = require('sequelize');
const dbSequelizer = require('../../db_config/db');

const Order_Item = dbSequelizer.define('orders_item', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  egg: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  weight: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  delivered_date: {
    type: Sequelize.DATE,
  },
});

module.exports = Order_Item;
