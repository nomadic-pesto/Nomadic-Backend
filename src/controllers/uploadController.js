const catchAsync = require('./../utils/catchAsync');
const s3upload = require('./../utils/s3upload');

exports.awsUpload = catchAsync(async (req, res, next) => {
  try {
    const results = await s3upload(req.files);
    console.log(results);
    return res.status(201).json({ status: 'success', data: results });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
    });
  }
});
