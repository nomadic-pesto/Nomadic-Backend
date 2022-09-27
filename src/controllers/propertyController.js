const { getAllPropertiesService } = require('../services/propertyService');
const catchAsync = require('./../utils/catchAsync');

const allPropertiesController = catchAsync(async (req, res, next) => {
  const { skip, limit,destination,subDestination,sortBy,sortOrder,search } = req.body;

  const allProperties = await getAllPropertiesService(skip, limit,destination,subDestination,sortBy,sortOrder,search);

  res.status(201).json({
    status: 'success',
    data: {
      properties: allProperties,
    },
  });
});

module.exports = {
  allPropertiesController,
};
