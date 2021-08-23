const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CategoryB = sequelize.define('categoryB', {
  categoryBId: {
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

module.exports = CategoryB;
