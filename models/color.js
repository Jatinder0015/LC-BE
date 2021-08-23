const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Color = sequelize.define('color', {
  colorId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  colorName:{
      type: Sequelize.STRING,
      allowNull: false   
         }
});

module.exports = Color;
