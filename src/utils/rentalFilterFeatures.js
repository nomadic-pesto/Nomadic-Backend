class RentalFilterFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  destinationFilter() {
    //excluding sort filter from the query
    const queryObj = { ...this.queryString };
    const excludedFields = ['sort', 'page', 'limit'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //adding $ infront on gte and lte which is not included in query params
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    this.query = this.query.select(
      'rentalName destination subDestination noOfPeopleAccomodate price thumbnailImages avgReview'
    );
    return this;
  }
  sort() {
    this.query = this.query.sort(this.queryString.sort);
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 24;

    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = RentalFilterFeature;
