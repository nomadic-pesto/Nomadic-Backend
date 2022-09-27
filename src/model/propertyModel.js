const mongoose = require('mongoose');
const validator = require('validator');

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: [true, 'Property Name is required'],
  },
  streetName: {
    type: String,
    required: [true, 'Steet Name is required'],
  },
  images: [{
    type: String,
  }],
  price: {
    type: Number,
    default: 0,
    required: [true, 'Price is required'],
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
  },
  subDestination: {
    type: String,
    required: [true, 'Sub-destination is required'],
  },
  reviewsAverage: {
    type: Number,
    default: 0,
    required: [true, 'Review Average is required'],
  },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
