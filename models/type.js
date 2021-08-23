const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Type = sequelize.define('type', {
  typeId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  typeName:{
      type: Sequelize.STRING,
      allowNull: false   
         }
});

module.exports = Type;
