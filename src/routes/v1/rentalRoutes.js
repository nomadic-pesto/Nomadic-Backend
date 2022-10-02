const express = require('express');
const authController = require('./../../controllers/authController');
const rentalController = require('./../../controllers/rentalController');

const router = express.Router();

router.post('/addRental', rentalController.addRental);
router.get('/',rentalController.getAllRental);
router.get('/search/',rentalController.searchForRental);
router.get('/:id',rentalController.getRentalById);
router.get('/owner/:id',rentalController.getRentalByOwner);
router.patch('/:id',rentalController.updateRental);

module.exports = router;
