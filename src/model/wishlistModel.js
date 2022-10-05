const mongoose = require('mongoose')

const wishlistSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    rentalId:{
        type:mongoose.Schema.ObjectId,
        ref:'Rental'
    }
})