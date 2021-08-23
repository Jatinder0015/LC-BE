const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
  userId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userName: {
      type :Sequelize.STRING,
      allowNull: false
    },
  userEmail:{
  type: Sequelize.STRING,
  unique:true
  },
  
  userPass: {
    type :Sequelize.STRING,
    allowNull: false
  },
  
  userPhone: {
    type :Sequelize.STRING,
    allowNull: true
  }
  ,
  resetToken: Sequelize.STRING,
  resetTokenExpiration: Sequelize.DATE

});

module.exports = User;
