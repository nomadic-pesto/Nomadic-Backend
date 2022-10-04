const express = require('express');
const authController = require('./../../controllers/authController');
const bookingController = require('./../../controllers/bookingController')

const router = express.Router();

router.get('/getBlockDate/:id',bookingController.getBlockedDates );
router.get('/getAllBookingAdmin/:id', bookingController.getAllBookingsAdmin );
router.get('/getAllBookingUser/:id', bookingController.getAllBookingsUser );
router.post('/bookARental',bookingController.bookaRental );
router.patch('/cancelBooking/:id',bookingController.cancelBooking );


module.exports = router;
