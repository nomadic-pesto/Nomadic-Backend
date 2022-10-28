//importing dependencies and express
const express = require('express');
const authController = require('./../../controllers/authController');

//creating route
const router = express.Router();

//defining methods
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/googlelogin', authController.googlelogin);

router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updatePassword', authController.userAuthorization, authController.updatePassword);
router.patch('/updateUser', authController.userAuthorization, authController.updateUser);

module.exports = router;
