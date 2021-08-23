const express = require('express');

const categoryController = require('../controller/categoryA');

const router = express.Router();

// GET /product/posts
// POST /feed/post
router.post(
  '/add-category',
  categoryController.createCategory
);

module.exports = router;
