const Sequelize = require('sequelize');
const sequelize = require('../../db_config/db');



const ProductManufacturer = sequelize.define('productManufacturer', {
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
        allowNull: false,
        defaultValue: 1
    }
}, {
    underscored: true
});

module.exports = ProductManufacturer;