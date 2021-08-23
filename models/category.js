const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Category = sequelize.define('category', {
  categoryId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  categoryName:{
      type: Sequelize.STRING,
      allowNull: false   
         },
         orderCount:{
          type: Sequelize.INTEGER,
          // allowNull: false   
             },
   categoryImage: {
    
          type:Sequelize.STRING(500)
        }
});

module.exports = Category;
