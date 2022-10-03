const express = require('express');
const authController = require('./../../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/googlelogin', authController.googlelogin);

router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updatePassword', authController.userAuthorization, authController.updatePassword);

module.exports = router;
