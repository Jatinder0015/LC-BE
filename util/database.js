const Sequelize = require('sequelize');

const sequelize = new Sequelize('luxurycrafts', 'nexusway', 'Nexusway@12345', {
  dialect: 'mysql',
  host: 'localhost'
});

// const sequelize = new Sequelize('luxurycrafts', 'root', 'root', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

module.exports = sequelize;
