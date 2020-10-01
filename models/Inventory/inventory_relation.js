const Sequelize = require('sequelize');
const Category = require('./product_category');
const Subcategory = require('./product_subcategory');
const Unit = require('./product_unit');
const Flavour = require('./product_flavour');
const Product_Flavour = require('./inventory_product_flavour');
const Product = require('./inventory_product');
const Shape = require('./product_shape');
const Product_Shape = require('./inventory_product_shape');
module.exports =
{
    relation: () => {
        Category.hasMany(Subcategory, { foreignKey: 'category_id', onDelete: 'cascade' });
        Subcategory.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'cascade' });
        Subcategory.hasMany(Product, { foreignKey: 'subcategory_id', onDelete: 'cascade' });
        Unit.hasMany(Product, { foreignKey: 'unit_id', onDelete: 'cascade' });
        Product.belongsTo(Subcategory, { foreignKey: 'subcategory_id', onDelete: 'cascade' });
        Product.belongsTo(Unit, { foreignKey: 'unit_id', onDelete: 'cascade' });
        Product.hasMany(Product_Flavour, { foreignKey: "product_id", onDelete: 'cascade' });
        Product_Flavour.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'cascade' })
        Product_Flavour.belongsTo(Flavour, { foreignKey: 'flavour_id', onDelete: 'cascade' });
        Product.hasMany(Product_Shape, { foreignKey: "product_id", onDelete: 'cascade' });
        Product_Shape.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'cascade' })
        Product_Shape.belongsTo(Shape, { foreignKey: 'shape_id', onDelete: 'cascade' });



        console.log("Executed");
    }

}