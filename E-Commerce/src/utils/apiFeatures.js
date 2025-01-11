class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery; // mongoose query
    this.queryString = queryString; // req.query
    this.metaData = {}; // Initialize empty metadata object
  }
  // ===== 1- Filter =====
  filter() {
    const filterObj = { ...this.queryString };
    const excludedFields = ["page", "limit", "sort", "fields", "search"];
    excludedFields.forEach((field) => delete filterObj[field]);

    let filterStr = JSON.stringify(filterObj);
    filterStr = filterStr.replace(
      /(gt|gte|lt|lte|in|nin|exists|regex|eq|ne)/g,
      (match) => `$${match}`
    );

    this.mongooseQuery.find(JSON.parse(filterStr));
    return this;
  }
  // ===== 2- Sort =====
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortBy);
    }
    return this;
  }
  // ===== 3- Select =====
  selectFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
  // ===== 4- Search by name or description (default) =====
  search(fields = ["name", "description"]) {
    if (this.queryString.search) {
      this.mongooseQuery.find({
        $or: fields.map((field) => ({
          [field]: { $regex: this.queryString.search, $options: "i" },
        })),
      });
    }
    return this;
  }
  // ===== 5- Pagination =====
  async paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 20;
    const skip = (page - 1) * limit;

    // Clone the query to get result documents count without pagination
    const countQuery = this.mongooseQuery.model.find(this.mongooseQuery.getQuery());
    const resultDocumentsCount = await countQuery.countDocuments();
    const totalCount = await this.mongooseQuery.model.countDocuments();
    this.metaData = {
      limit,
      skip,
      totalCount,
      resultsCount: resultDocumentsCount,
      totalPages: Math.ceil(resultDocumentsCount / limit),      
      currentPage: page,
      nextPage: page + 1 <= Math.ceil(resultDocumentsCount / limit) ? page + 1 : null,
      previousPage: page - 1 > 0 ? page - 1 : null,
    };
    this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }
}

export default ApiFeatures;
