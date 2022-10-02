const express = require('express');
const userRoute = require('./userRoutes');
const propertyRoute = require('./propertyRoutes');
const uploadRoute = require('./uploadRoute');

const rentalRoute = require('./rentalRoutes');
const bookingRoute = require('./bookingRoute')


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: userRoute,
  },
  {
    path: '/property',
    route: propertyRoute,
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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
