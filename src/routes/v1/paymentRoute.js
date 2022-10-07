const express = require('express');
const authController = require('./../../controllers/authController');
const paymentController = require('./../../controllers/paymentController')

const router = express.Router()

router.post('/checkout',paymentController.checkout)
router.post('/paymentVerification',paymentController.paymentVerification)

module.exports = router