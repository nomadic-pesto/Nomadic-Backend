const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Razorpay = require('razorpay')
// const razorpayInstance = require('./../server')

exports.checkout = catchAsync( async(req,res,next)=>{

    const instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_API_SECRET })
    const options ={
        amount:50000,
        currency:'INR'
    };
    const order = await instance.orders.create(options);
console.log(order)

res.status(200).json({
    success: true,
    data : order
})
})