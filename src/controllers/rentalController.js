const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Rental = require('./../model/rentalModel');
const RentalFilterFeature = require('./../utils/rentalFilterFeatures');
const { findByIdAndUpdate } = require('./../model/rentalModel');

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
    ownerId:req.body.ownerId
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


exports.getAllRental = catchAsync( async (req,res,next)=>{
    // console.log(req.query)
    const tour = new RentalFilterFeature(Rental.find(),req.query).destinationFilter().sort().paginate()
    const tours = await tour.query
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
          tours
        }
      });

})

exports.getRentalByOwner = catchAsync( async (req,res,next)=>{
    const rental = await Rental.find({ownerId:req.params.id})

    if(!rental){return new AppError('you have no rental listed', 404)}

    res.status(200).json({
        status: 'success',
        data: {
            rental
        }
})
})

exports.updateRental = catchAsync( async(req,res,next)=>{
    const rental = await Rental.findByIdAndUpdate(req.params.id,req.body,{new: true})

    if(!rental){return new AppError('you have no rental listed', 404)}

    res.status(200).json({
        status: 'success',
        data: {
            rental
        }})
})