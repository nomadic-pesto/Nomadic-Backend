const express = require('express');
const userRoute = require('./userRoutes');
const uploadRoute = require('./uploadRoute');

const rentalRoute = require('./rentalRoutes');
const bookingRoute = require('./bookingRoute')
const wishlistRoute = require('./wishlistRoute')
const paymentRoute = require('./paymentRoute')


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: userRoute,
  },
  {

    path: '/upload',
    route: uploadRoute,

    path: '/rental',
    route: rentalRoute,
  },  {
    path: '/booking',
    route: bookingRoute,
  },
  {
    path: '/wishlist',
    route: wishlistRoute,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
