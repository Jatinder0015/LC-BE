const express = require('express');

const categoryAController = require('../controller/categoryB');

const router = express.Router();


router.get('/all-category/:cid', categoryAController.getAllCategory);
router.delete('/delete-category/:id', categoryAController.deleteCategory);

router.post(
  '/add-category/:cid',
  categoryAController.createCategory
);

// router.delete('/remove-address/:AddressId', isAuth, addressController.deleteAddress);

module.exports = router;
