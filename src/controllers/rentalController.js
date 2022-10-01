const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Rental = require('./../model/rentalModel');

exports.addRental = catchAsync(async (req, res, next) => {

  const newRental = await Rental.create({
    rentalName: req.body.rentalName,
    destination: req.body.destination,
    subDestination: req.body.subDestination,
    noOfPeopleAccomodate: req.body.noOfPeopleAccomodate,
    price: req.body.price,
    houseType: req.body.houseType,
    amenities: req.body.amenities,
    overview: req.body.overview,
    address: req.body.address,
    streetName: req.body.streetName,
    district: req.body.district,
    state: req.body.state,
    originalImages: req.body.originalImages,
    thumbnailImages: req.body.thumbnailImages,
    avgReview: req.body.avgReview,
    noOfReview: req.body.noOfReview,
  });

  res.status(201).json({
    status: 'success',
    data: {
      rental: newRental,
    },
  });
});

exports.getRentalById = catchAsync(async (req,res,next)=>{
    const rental = await Rental.findById(req.params.id)

    if(!rental){ return new AppError('Rental with given ID is not found', 404)}

    res.status(200).json({
        status: 'success',
        data: {
          rental,
        },
    })
})
