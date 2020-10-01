const Sequelize = require('sequelize');
const sequelize = require('../../db_config/db');


const ProductSubCategory = sequelize.define('productSubCategory', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    available: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    }
    //Category.hasMany(ProductSubCategory, {foreignKey: 'category_id'})
}, {
    underscored: true
});

module.exports = ProductSubCategory;