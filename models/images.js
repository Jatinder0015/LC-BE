const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Image = sequelize.define('image', {
    imageId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
   imageUrl: {
    
          type:Sequelize.STRING(500)
        }
});

module.exports = Image;