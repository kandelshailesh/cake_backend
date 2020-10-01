const Sequelize = require('sequelize');
const dbSequelizer = require('../../db_config/db');


const inventoryProductFlavour = dbSequelizer.define('inventoryProductFlavour', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    underscored: true
});

module.exports = inventoryProductFlavour;