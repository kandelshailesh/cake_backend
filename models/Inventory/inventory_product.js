const Sequelize = require('sequelize');
const dbSequelizer = require('../../db_config/db');


const InventoryProduct = dbSequelizer.define('inventoryProduct', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true
    },
    code: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    rate_without_egg: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    rate_with_egg: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    underscored: true
});


module.exports = InventoryProduct;