class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery; // mongoose query
    this.queryString = queryString; // req.query
    this.metaData = {}; // Initialize empty metadata object
  }
  // ===== 1- Pagination =====
  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 20;
    const skip = (page - 1) * limit;
    this.metaData = {
      page,
      limit,
      skip,
      totalPages: Math.ceil(this.mongooseQuery.length / limit),
      resultsCount: this.mongooseQuery.length,
    };
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }
  // ===== 2- Filter =====
  filter() {
    const filterObj = { ...this.queryString };
    const excludedFields = ["page", "limit", "sort", "fields", "search"];
    excludedFields.forEach((field) => delete filterObj[field]);

    let filterStr = JSON.stringify(filterObj);
    filterStr = filterStr.replace(
      /(gt|gte|lt|lte|in|nin|exists|regex|eq|ne)/g,
      (match) => `$${match}`
    );

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(filterStr));
    return this;
  }
  // ===== 3- Sort =====
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    }
    return this;
  }
  // ===== 4- Select =====
  selectFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    }
    return this;
  }
  // ===== 5- Search by name or description (default) =====
  search(fields = ["name", "description"]) {
    if (this.queryString.search) {
      this.mongooseQuery = this.mongooseQuery.find({
        $or: fields.map((field) => ({
          [field]: { $regex: this.queryString.search, $options: "i" },
        })),
      });
    }
    return this;
  }
}

export default ApiFeatures;
