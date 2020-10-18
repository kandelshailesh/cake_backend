const Sequelize = require('sequelize');
const dbSequelizer = require('../../db_config/db');
const base64Img = require('base64-img');

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
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  delivered_date: {
    type: Sequelize.DATE,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value) {
      const upload_image = value
        ? base64Img.imgSync(
            value,
            'uploads',
            (Math.random() + 1).toString(36).substring(7),
          )
        : '';
      console.log('Upload Image', upload_image);
      this.setDataValue('image', upload_image);
    },
  },
});

module.exports = Order_Item;
