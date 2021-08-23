const express = require('express');

const typeController = require('../controller/type');

const router = express.Router();

// GET /product/posts
 router.get('/all-type', typeController.getAllType);

// POST /feed/post
router.post(
  '/add-type',
  typeController.addType
);
router.delete(
  '/delete-type/:id',
  typeController.deleteType
);

module.exports = router;
