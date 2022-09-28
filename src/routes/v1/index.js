const express = require('express');
const userRoute = require('./userRoutes');
const propertyRoute = require('./propertyRoutes');
const uploadRoute = require('./uploadRoute');

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
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
