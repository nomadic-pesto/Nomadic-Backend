const express = require('express');
const authController = require('./../../controllers/authController');
const rentalController = require('./../../controllers/rentalController');

const router = express.Router();

router.post('/addRental', rentalController.addRental);
router.patch('/updateRental');
router.get('/all');
router.get('/:id',rentalController.getRentalById);

module.exports = router;
