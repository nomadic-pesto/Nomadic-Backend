const Property = require('../model/rentalModel');

const getAllPropertiesService = async (skip, limit,destination,subDestination,sortBy,sortOrder) => {
  try {
   const filterProperty = {
    ...(destination && {destination}),
    ...(subDestination && {subDestination})
  }
    const allProperties = await Property.find(filterProperty).skip(skip).limit(limit);
    return allProperties;
  } catch (e) {
    throw new ApiError('Failed to updated brand', e);
  }
};

module.exports = {
  getAllPropertiesService,
};
