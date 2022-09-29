const { string } = require('joi');
const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    transactionID:{
        type:String,
        required:[true, 'Trasaction ID is required']
    },
    rentalID:{
        type:String,
        required:[true, 'Rental ID is required']
    },
    userID:{
        type:String,
        required:[true, 'User ID is required']
    },
    isStayCompleted:{
        type: Boolean,
        default : false
    },
    isCancelled:{
        type: Boolean,
        default : false
    },
    startDate:{
        type:Date,
        required:[true, 'Start date is required']
    },
    endDate:{
        type:Date,
        required:[true, 'End date is required']
    },
    bookingDate:{
        type:Date,
        required:[true, 'Booking date is required']
        default: ()=> Date.now(),
    },
    username:{
        type:String,
        required:[true, 'Username is required']
    },

})



const Bookings = mongoose.model('Bookings', bookingSchema)