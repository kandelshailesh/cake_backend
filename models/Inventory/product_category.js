const Sequelize = require('sequelize');
const sequelize = require('../../db_config/db');


const ProductCategory = sequelize.define('productCategory', {
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
}, {
    underscored: true
});

module.exports = ProductCategory;