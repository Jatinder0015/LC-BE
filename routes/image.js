const express = require('express');

const imageController = require('../controller/image');

const router = express.Router();

// GET /product/posts
 router.get('/all-image/:pid', imageController.getImage);

// POST /feed/post
router.post(
  '/add-image',
  imageController.createImage
);
// router.delete(
//   '/delete-address/:addressId',
//   addressController.deleteAddress
// );

// router.put(
//   '/update-address',
//   addressController.updateAddress
// );

// router.delete('/remove-address/:AddressId', isAuth, addressController.deleteAddress);

module.exports = router;
