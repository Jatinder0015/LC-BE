const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controller/auth');

const router = express.Router();

router.get('/all-user',authController.getAll);

router.post(
  '/signup',
  [
    // body('email')
    //   .isEmail()
    //   .withMessage('Please enter a valid email.')
    //   .custom((value, { req }) => {
    //     return User.findOne({ email: value }).then(userDoc => {
    //       if (userDoc) {
    //         return Promise.reject('E-Mail address already exists!');
    //       }
    //     });
    //   })
    //   .normalizeEmail(),
    // body('password')
    //   .trim()
    //   .isLength({ min: 5 }),
    // body('firstName')
    //   .trim()
    //   .not()
    //   .isEmpty(),
  ],
  authController.signup
);

router.post('/login', authController.login);

router.post('/user-update', authController.userUpdate);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

router.get('/getUserByEmail/:email', authController.getUserByEmail);


router.get('/get-user/:id',authController.getUser);

router.delete('/delete-user/:userId',authController.deleteUser);

module.exports = router;
