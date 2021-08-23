const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Address = sequelize.define('address', {
  addressId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  addressArea: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  district: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Address;
