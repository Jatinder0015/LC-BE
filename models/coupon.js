const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Coupon = sequelize.define('coupon', {
    couponId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  categoryName:{
      type: Sequelize.STRING,
      allowNull: false   
         },
   couponImage: {
    
          type:Sequelize.STRING(500)
        },
        couponDesc: {
    
            type:Sequelize.STRING
          }
});

module.exports = Coupon;