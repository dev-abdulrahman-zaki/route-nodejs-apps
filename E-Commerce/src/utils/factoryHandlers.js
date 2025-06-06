import { catchError } from "../middlewares/error/catchError.middleware.js";
import ApiFeatures from "./apiFeatures.js";
import { SystemError } from "./systemError.js";

export const getAll = (Model, validSearchFields = ["name", "description"], filterObj = {}) => {
  return catchError(async (req, res, next) => {
    // console.log(req.query)
    const apiFeatures = await new ApiFeatures(Model.find(filterObj), req.query)
      .filter()
      .sort()
      .selectFields()
      .search(validSearchFields)
      .paginate();
    const docs = await apiFeatures.mongooseQuery;
    // .populate(
    //   "createdBy",
    //   // "-password -email -confirmEmail -createdAt"
    // ); // or : const notes = await Note.find().populate("user", { password: 0 });
    if (!docs) {
      return next(new SystemError(`${Model.modelName} not found`, 404));
    }
    res
      .status(200)
      .json({ message: "success", metaData: apiFeatures.metaData, data: docs });
  });
};

export const deleteOne = (Model) => {
  return catchError(async (req, res, next) => {
    const doc = await Model.findOneAndDelete({ slug: req.params.slug });
    if (!doc) {
      return next(new SystemError(`${Model.modelName} not found`, 404));
    }
    res.status(200).json({ message: "success", data: doc });
  });
};
