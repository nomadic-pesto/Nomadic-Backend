const AppError =  require('../utils/appError')

const handleDuplicateFieldsDB = (err,res) => {
  const value = err.keyValue.email

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return res.status(400).json({status: 'fail',
data:message})
};

const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    data:{},
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unknown error: don't leak error details
  console.error('ERROR 💥', err);
  //send generic error message
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

module.exports = (err, req, res, next) => {
    console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    let error = { ...err }
    console.log(error)
    if (error.code === 11000) error = handleDuplicateFieldsDB(error,res);
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }
    if (error.code === 11000) error = handleDuplicateFieldsDB(error,res);
    sendErrorProd(error, req, res);
  }
};
