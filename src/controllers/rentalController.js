const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Rental = require('./../model/rentalModel');
const RentalFilterFeature = require('./../utils/rentalFilterFeatures');


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
// removing empty query 
    Object.keys(req.query).forEach(key=>{
      if(key === 'price'){
        let value = req.query[key]
        Object.keys(value).forEach(key => {
          if (value[key] === '') {
            delete value[key];
          }
        });
      }
      
      else if(req.query[key]=== ''){
        delete req.query[key];
      }
    })
 // querying the data
    const tour = new RentalFilterFeature(Rental.find(),req.query).destinationFilter().sort().paginate()
    console.log(req.query)
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

exports.searchForRental = catchAsync( async (req,res,next)=>{
  Object.keys(req.query).forEach(key=>{
    if(key === 'price'){
      let value = req.query[key]
      Object.keys(value).forEach(key => {
        if (value[key] === '') {
          delete value[key];
        }
      });
    }
    
    else if(req.query[key]=== ''){
      delete req.query[key];
    }
  })
  // const rentals = await Rental.find({$or:[{destination:req.query.data},{subDestination:req.query.data},{rentalName:req.query.data}]})
console.log(req.query.data)

  console.log(req.query.data)
  let rentals = await  new RentalFilterFeature(Rental.find(),req.query).searchFilter()
  rentals = rentals.query
  if(!rentals){ return new AppError('No rental found', 404)}

  res.status(200).json({
    status: 'success',
    data: {
        rentals
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