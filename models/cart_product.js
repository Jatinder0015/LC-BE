const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CartProduct = sequelize.define('cart_product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = CartProduct;
