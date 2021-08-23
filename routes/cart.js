const express = require('express');
const { body } = require('express-validator/check');
 
const User = require('../models/user');
const cartController = require('../controller/cart');
 
const router = express.Router();
 
router.post(
  '/add-product-cart',
    cartController.addProductToCart
);
 

router.post(
    '/remove-a-product-cart',
      cartController.removeAProductFromCart
  );
   
  
router.delete(
    '/delete-a-product-cart/:email/:pid',
      cartController.decrementAProductFromCart
  );
  router.get(
    '/get-all-product/:email',
      cartController.getProductFromCart
  );

  module.exports = router;