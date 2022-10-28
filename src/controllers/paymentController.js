const catchAsync = require('./../utils/catchAsync');
const razorpayInstance = require('./../server')
const crypto = require('crypto')



exports.checkout = catchAsync( async(req,res,next)=>{

    const options ={
        amount: Number(req.body.amount*100),
        currency:'INR'
    };
    const order = await razorpayInstance.instance.orders.create(options);
console.log(order)

res.status(200).json({
    success: true,
    data : order
})
})

exports.paymentVerification = catchAsync(async (req, res) => {
  
    const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");
  
    const isAuthentic = expectedSignature === req.body.razorpay_signature;
    console.log(isAuthentic)
  
    if (isAuthentic) {
    res.status(200).json({
        status: true,
    })
    } else {
      res.status(400).json({
        status: false,
      });
    }
})