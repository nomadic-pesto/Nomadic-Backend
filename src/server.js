const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './src/config.env' });
const app = require('./app');
const Razorpay = require('razorpay')
const URI = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD); //"mongodb://localhost:27017/nomadic"

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('connected to DB successfully');
  } catch (error) {
    console.error(error);
  }
};

exports.instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_API_SECRET });


connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port} `);
});