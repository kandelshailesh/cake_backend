const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// {
//   host: config.host,
//   port:config.port,
//   dialect: "mysql",
//   pool: {
//       max: 5,
//       min: 0,
//       idle: 10000
//     },
//     dialectOptions:{
//     ssl:true=="true"   
//     }
// sequelize
//   .sync()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
// console.info(sequelize);

module.exports = sequelize;

