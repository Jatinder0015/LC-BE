const express = require('express');
const { body } = require('express-validator/check');
 
const User = require('../models/user');
const feedbackController = require('../controller/feedback');
 
const router = express.Router();
 
router.post(
  '/add-feedback',
  feedbackController.addFeedback
);
 

router.delete(
  '/delete-feedback/:fid',
  feedbackController.removeFeedback
);


router.get(
  '/get-feedback/:pid',
  feedbackController.getFeedback
);
module.exports = router;