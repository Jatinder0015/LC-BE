const express = require('express');

const addressController = require('../controller/addrss');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /product/posts
 router.get('/all-address/:uid', addressController.getAddress);

// POST /feed/post
router.post(
  '/add-address',
  addressController.createAddress
);
router.delete(
  '/delete-address/:addressId',
  addressController.deleteAddress
);

router.put(
  '/update-address',
  addressController.updateAddress
);

// router.delete('/remove-address/:AddressId', isAuth, addressController.deleteAddress);

module.exports = router;
