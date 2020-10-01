const Sequelize = require('sequelize');
const sequelize = require('../../db_config/db');
const ProductUnit = sequelize.define('productUnit', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    sname:
    {
        type: Sequelize.STRING(100),
    }
}, {
    underscored: true
});

module.exports = ProductUnit;