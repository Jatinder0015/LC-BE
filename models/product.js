const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const buffer = new ArrayBuffer(1);
const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  productName:{
      type: Sequelize.STRING,
      allowNull: false   
         },
  productType:{
    type: Sequelize.STRING,
    allowNull: false   
       },
  productQuantity:{
           type: Sequelize.INTEGER,
           allowNull: false   
              },
  productOriginalPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  productDiscountPersent: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  productDiscountedPrice: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  productDescription: {
    type: Sequelize.JSON,
    allowNull: false
  },
  productCategory:{
    type: Sequelize.STRING, 
    allowNull: false   
       },
       productColor:{
        type: Sequelize.STRING, 
        allowNull: false   
           }
       ,
  // productImage: {
    
  //   type:Sequelize.STRING(500), 
  //   allowNull: false   
  // }
});

module.exports = Product;
