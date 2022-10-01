const express = require('express');
const userRoute = require('./userRoutes');
const propertyRoute = require('./propertyRoutes');
const rentalRoute = require('./rentalRoutes');

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
    path: '/rental',
    route: rentalRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
