const express = require('express');

const colorController = require('../controller/color');

const router = express.Router();

// GET /product/posts
 router.get('/all-color', colorController.getAllColor);

// POST /feed/post
router.post(
  '/add-color',
  colorController.addColor
);
router.delete(
  '/delete-color/:id',
  colorController.deleteColor
);

module.exports = router;
