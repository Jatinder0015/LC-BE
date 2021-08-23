const express = require('express');

const stateController = require('../controller/state');

const router = express.Router();

// GET /product/posts
 router.get('/all-state', stateController.getAllState);

// POST /feed/post
router.post(
  '/add-state',
  stateController.addState
);
router.delete(
  '/delete-state/:id',
  stateController.deleteState
);

module.exports = router;
