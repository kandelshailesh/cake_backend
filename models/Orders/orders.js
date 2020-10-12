const Sequelize = require('sequelize');
const dbSequelizer = require('../../db_config/db');

const Order = dbSequelizer.define('orders', {
  order_id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  city: {
    type: Sequelize.TEXT,
  },
  // country: {
  //   type: Sequelize.TEXT,
  // },
  total_amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  total_product: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  order_status: {
    type: Sequelize.ENUM('PENDING', 'DELIVERED', 'CANCELLED'),
    validate: {
      isIn: [['PENDING', 'DELIVERED', 'CANCELLED']],
    },
    defaultValue: 'PENDING',
  },
  ordered_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  cancelled_date: {
    type: Sequelize.DATE,
  },
  delivered_date: {
    type: Sequelize.DATE,
  },
  payment_method: {
    type: Sequelize.ENUM('CASH ON DELIVERY'),
    validate: {
      isIn: [['CASH ON DELIVERY']],
    },
    defaultValue: 'CASH ON DELIVERY',
  },
  shipping_address: {
    type: Sequelize.VIRTUAL,
    get() {
      return (
        this.get('address') +
        ', ' +
        this.get('city') +
        ' ,' +
        this.get('country')
      );
    },
  },
});

module.exports = Order;
