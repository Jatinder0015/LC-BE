const express = require('express');
const { body } = require('express-validator/check');

const Admin = require('../models/admin');
const authController = require('../controller/admin');

const router = express.Router();

router.get('/all-admin',authController.getAll);

router.post(
  '/signup',
  authController.signup
);

router.post('/login', authController.login);


router.get('/getAdminByEmail/:email', authController.getUserByEmail);

module.exports = router;
