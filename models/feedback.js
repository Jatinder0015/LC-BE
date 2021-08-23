const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Feedback = sequelize.define('feedback', {
  feedbackId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  feedbackHeading:{
    type: Sequelize.STRING,
    allowNull: false   
       },
  feedbackDesc:{
      type: Sequelize.JSON,
      allowNull: false   
         },
  feedbackRating:{
           type: Sequelize.INTEGER,
           allowNull: false   
              }
});

module.exports = Feedback;
