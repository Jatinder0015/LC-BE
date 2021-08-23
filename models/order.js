const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Order = sequelize.define('order', {
  orderId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  orderDispatchedStatus: {
    type: Sequelize.TINYINT
  },

  orderDelieverStatus: {
    type: Sequelize.TINYINT
  },
  orderCancelStatus: {
    type: Sequelize.TINYINT
  },
  razorpayPaymentId: {
    type: Sequelize.STRING
  },
  razorpayOrderId: {
    type: Sequelize.STRING
  },
  orderPaymentType: {
    type: Sequelize.TINYINT
  }
  ,
  orderTotalAmount: {
    type: Sequelize.INTEGER
  }
  ,
  orderDeliveryCharges: {
    type: Sequelize.INTEGER
  },
  // orderAddressId: {
  //   type: Sequelize.INTEGER
  // },
  area: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  district: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  }
  
});

module.exports = Order;
