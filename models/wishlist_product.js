const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const WishlistProduct = sequelize.define('wishlist_product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
  
});

module.exports = WishlistProduct;
