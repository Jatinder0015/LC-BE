const express = require('express');
const { body } = require('express-validator/check');
 
const User = require('../models/user');
const orderController = require('../controller/order');
 
const router = express.Router();


router.get(
    '/get-order/:uid',
    orderController.getOrder
  );

  
  router.post(
    '/razorpay',
    orderController.razorpayPayment
  );
   
  router.get(
    '/get-all-order',
    orderController.getAllOrder
  );
  
  router.post(
    '/accept-order/:id',
    orderController.acceptOrder
  );
  router.post(
    '/dispatch-order/:id',
    orderController.dispatchOrder
  );

  router.post(
    '/cancel-order',
    orderController.cancelOrder
  );
  
  
  router.post(
    '/create-order',
    orderController.postOrder
  );

  router.post(
    '/create-buy-order',
    orderController.postOrderBuy
  );
//   router.post(
//     '/update-order',
//     orderController.updateOrder

// );
  module.exports = router;