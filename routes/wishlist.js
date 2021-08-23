const express = require('express');
const { body } = require('express-validator/check');
 
const User = require('../models/user');
const wishlistController = require('../controller/wishlist'); 
const router = express.Router(); 
router.post(
  '/add-product-wishlist',
  wishlistController.addProductToWishlist
);
 

router.post(
    '/remove-a-product-wishlist',
    wishlistController.removeAProductFromWishlist
  );
   
  
// router.delete(
//     '/delete-a-product-cart/:email/:pid',
//     wishlistController.decrementAProductFromCart
//   );
  router.get(
    '/get-all-product/:email',
    wishlistController.getProductFromWishlist
  );

  module.exports = router;