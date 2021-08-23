const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const State = sequelize.define('state', {
  stateId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  stateName:{
      type: Sequelize.STRING,
      allowNull: false   
         }
         ,
  stateCharges:{
      type: Sequelize.DOUBLE,
      allowNull: false   
         }
});

module.exports = State;