const express = require('express');
const upload = require('./../../middlewares/multer');
const awsupload = require('./../../controllers/uploadController');

const router = express.Router();

router.post('/', upload.array('file'), awsupload.awsUpload);

module.exports = router;
