const mongoose = require('mongoose')
const bcryt = require('bcryptjs')
const validator= require('validator') 

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    email:{
        type:String,
        required:[true, 'Provide your email address'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail, 'Please provide valid email address']

    },
    photo:String,
    password:{
        type:String,
        required:[true, 'Please provide a password'],
        minlength:8,
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true, 'Please confirm your password'],
    },
    isEmailVerfied:{
        type:Boolean,
        default:false
    },
    changedAt:Date,
    resetToken:String,
    resetExpires:Date
})



const User = mongoose.model('User', userSchema);

module.exports = User;