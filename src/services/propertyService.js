const Property = require('./../model/propertyModel');

const getAllPropertiesService = async (skip, limit, destination, subDestination, sortBy, sortOrder, search) => {
  try {
    const filterProperty = {
      ...(destination && { destination }),
      ...(subDestination && { subDestination }),
      ...(search && {
        $or: [
          { propertyName: { $regex: `.*${search}.*`, $options: 'i' } },
          { streetName: { $regex: `.*${search}.*`, $options: 'i' } },
          { destination: { $regex: `.*${search}.*`, $options: 'i' } },
          { subDestination: { $regex: `.*${search}.*`, $options: 'i' } },
        ],
      }),
    };
    const allProperties = await Property.find(filterProperty).skip(skip).limit(limit);
    return allProperties;
  } catch (e) {
    throw new ApiError('Failed to updated brand', e);
  }
};

module.exports = {
  getAllPropertiesService,
};
