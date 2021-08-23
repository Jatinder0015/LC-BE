const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Admin = sequelize.define('admin', {
  adminId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  adminName: {
      type :Sequelize.STRING,
      allowNull: false
    },
  adminEmail:{
  type: Sequelize.STRING,
  unique:true
  },
  
  adminPass: {
    type :Sequelize.STRING,
    allowNull: false
  },
  
 
  
  

});

module.exports = Admin;
