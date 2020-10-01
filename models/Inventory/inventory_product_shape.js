const Sequelize = require('sequelize');
const dbSequelizer = require('../../db_config/db');


const inventoryProductShape = dbSequelizer.define('inventoryProductShape', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    underscored: true
});

module.exports = inventoryProductShape;