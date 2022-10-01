const mongoose = require('mongoose');


const rentalSchema = new mongoose.Schema({
  rentalName: {
    type: String,
    required: [true, 'Property Name is required'],
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
  },
  subDestination: {
    type: String,
    required: [true, 'Sub-destination is required'],
  },
  noOfPeopleAccomodate: {
    type: Number,
    default: 2,
    required: [true, 'People accomodation no is required'],
  },
  price: {
    type: Number,
    default: 0,
    required: [true, 'Price is required'],
  },
  houseType: {
    type: String,
    required: [true, 'House-type is required'],
  },
  amenities: [{ type: String }],
  overview: { type: String, required: [true, 'Overview is required'] },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  streetName: {
    type: String,
    required: [true, 'Steet Name is required'],
  },
  district: {
    type: String,
    required: [true, 'District is required'],
  },
  state: {
    type: String,
    required: [true, 'State is required'],
  },
  originalImages: [
    {
      type: String,
    },
  ],
  thumbnailImages: [
    {
      type: String,
    },
  ],
  avgReview: {
    type: Number,
    default: 4,
    required: [true, 'Review Average is required'],
  },
  noOfReview: {
    type: Number,
    default: 0,
    required: [true, 'Review Average is required'],
  },
    ownerId:{
        type: mongoose.Schema.ObjectId,
        ref:'User'
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
