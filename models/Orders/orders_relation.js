const Sequelize = require('sequelize');
const dbSequelizer = require('../../db_config/db');
const Order = require('./orders');
const Order_Item = require('./orders_item');
const User = require('../User/user');
const Product = require('../Inventory/inventory_product');
const Flavour = require('../Inventory/product_flavour');
const Shape = require('../Inventory/product_shape');

module.exports = {
  relation: () => {
    User.hasMany(Order, { foreignKey: 'user_id' });
    Order.belongsTo(User, { foreignKey: 'user_id' });
    Order.hasMany(Order_Item, { foreignKey: 'order_id', onDelete: 'cascade' });
    Order_Item.belongsTo(Order, { foreignKey: 'order_id' });
    Order_Item.belongsTo(Product, {
      foreignKey: 'product_id',
    });
    Order_Item.belongsTo(Flavour, { foreignKey: 'flavour_id' });
    Order_Item.belongsTo(Shape, { foreignKey: 'shape_id' });
  },
};
