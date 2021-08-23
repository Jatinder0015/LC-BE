const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CategoryA = sequelize.define('categoryA', {
  categoryAId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  categoryName: {
      type :Sequelize.STRING,
      allowNull: false
    }
  
});

module.exports = CategoryA;
