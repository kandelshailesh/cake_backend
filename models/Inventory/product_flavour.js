const Sequelize = require('sequelize');
const sequelize = require('../../db_config/db');


const productFlavour = sequelize.define('productFlavour', {
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
    charge:
    {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
}, {
    underscored: true
});

module.exports = productFlavour;