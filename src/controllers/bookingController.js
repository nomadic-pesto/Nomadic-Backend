const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Booking = require('./../model/bookingsModel');

var mongoose = require("mongoose");


exports.bookaRental = catchAsync(async (req,res,next)=>{

const booking = await Booking.create({
    transactionID: req.body.transactionID,
    rentalID: req.body.rentalID,
    userID: req.body.userID,
    isStayCompleted: req.body.isStayCompleted,
    isCancelled: req.body.isCancelled,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    bookingDate: req.body.bookingDate,
    userEmail: req.body.userEmail,
    ownerId: req.body.ownerId,
    bookingCost:req.body.bookingCost
})
// .populate({path:'ownerId',select:['name','email']})

if(!booking){
    return new AppError('Booking failed', 404)
}
res.status(201).json({
    status: 'success',
    data: {
        booking
    },
  });
})

exports.cancelBooking = catchAsync(async(req,res,next)=>{

    const booking = await Booking.findById(req.params.id)

    if(!booking){ return new AppError('Record of booking with given ID is not found', 404)}

    booking.isCancelled = req.body.isCancelled
    await booking.save()

    res.status(200).json({
        status: 'success',
        data: { booking },
      });

})

exports.getBlockedDates =  catchAsync( async(req,res,next)=>{
    const blockedDates = await Booking.find({rentalID:req.params.id}).select('startDate endDate')
    console.log(blockedDates)
    if(!blockedDates){ return new AppError('Record of booking with given ID is not found', 404)}

    res.status(200).json({
        status: 'success',
        data: { blockedDates },
      });
})

exports.getAllBookingsAdmin =  catchAsync( async(req,res,next)=>{
    
    console.log(new mongoose.Types.ObjectId(req.params.id))
    // const bookings = await Booking.find({ownerId: new mongoose.Types.ObjectId(req.params.id)}).populate({path:'rentalID', select:['rentalName','subDestination']}).populate({path:'userID', select:['name','email']})
    const bookings = await Booking.find({ownerId: req.params.id}).populate({path:'rentalID', select:['rentalName','subDestination']}).populate({path:'userID', select:['name','email']})
    if(!bookings){ return new AppError('There is no booking for your rental', 404)}

    res.status(200).json({
        status: 'success',
        data: { bookings },
      });
})

exports.getAllBookingsUser =  catchAsync( async(req,res,next)=>{
    const bookings = await Booking.find({userID:req.params.id}).populate({path:'rentalID', select:['rentalName','subDestination','noOfPeopleAccomodate']})

    if(!bookings){ return new AppError('you have made no booking', 404)}

    res.status(200).json({
        status: 'success',
        data: { bookings },
      });
})