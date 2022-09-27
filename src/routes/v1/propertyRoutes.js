const express = require('express');
const {allPropertiesController} = require('../../controllers/propertyController');
const { allProperties } = require('../../validations/property.validations');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.post(
  '/all',
  validate(allProperties), //validate
  allPropertiesController 
);

module.exports = router;
