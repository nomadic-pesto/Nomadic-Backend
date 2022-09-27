const express = require('express');
const userRoute = require('./userRoutes');
const propertyRoute = require('./propertyRoutes');

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
