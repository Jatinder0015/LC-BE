const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Wishlist = sequelize.define('wishlist', {
  wishlistId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
  
});

module.exports = Wishlist;
