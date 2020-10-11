const Sequelize = require('sequelize');
const dbSequelizer = require('../../db_config/db');
const Order = require('./orders');
const Order_Item = require('./orders_item');
const User = require('../User/user');
const Product = require('../Inventory/inventory_product');
const Flavour = require('../Inventory/product_flavour');
const Shape = require('../Inventory/product_shape');
const Order_Flavour = require('./orders_flavour');
const Order_Shape = require('./orders_shape');

module.exports = {
  relation: () => {
    User.hasMany(Order, { foreignKey: 'user_id' });
    Order.belongsTo(User, { foreignKey: 'user_id' });
    Order.hasMany(Order_Item, { foreignKey: 'order_id', onDelete: 'cascade' });
    Order_Item.belongsTo(Order, { foreignKey: 'order_id' });
    Order_Item.belongsTo(Product, {
      foreignKey: 'product_id',
    });
    Order_Flavour.belongsTo(Order_Item, { foreignKey: 'order_item_id' });
    Order_Shape.belongsTo(Order_Item, { foreignKey: 'order_item_id' });
    Order_Flavour.belongsTo(Flavour, { foreignKey: 'flavour_id' });
    Order_Shape.belongsTo(Shape, { foreignKey: 'shape_id' });
    Order_Item.hasMany(Order_Flavour, { foreignKey: 'order_item_id' });
    Order_Item.hasMany(Order_Shape, { foreignKey: 'order_item_id' });
  },
};
