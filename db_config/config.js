// const config = {
//   host: 'localhost',
//   username: 'alakacak_alakacak',
//   password: 'UlyLoKY5dkXG',
//   database: 'alakacak_cake',
//   port: 3306,
//   dialect: 'mysql',
//   logging: console.log,
//   pool: {
//     max: 100,
//     min: 0,
//     idle: 200000,
//     // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
//     acquire: 1000000,
//   },
//   dialectOptions: {
//     // useUTC: false, //for reading from database
//     dateStrings: true,
//     typeCast: true,
//     timezone: '+05:45',
//   },
//   timezone: '+05:45', //for writing tzo database
//   operatorsAliases: false,
// };

const config = {
  host: 'localhost',
  username: 'root',
  password: '',
  port: 3306,
  database: 'alakacake',
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    // useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: true,
    timezone: '+05:45',
  },
  timezone: '+05:45', //for writing tzo database
  operatorsAliases: false,
};

module.exports = config;
