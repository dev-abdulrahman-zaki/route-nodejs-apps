import { catchError } from "../middlewares/catchError.js";
import { SystemError } from "./systemError.js";

export const deleteOne = (Model) => {
  return catchError(async (req, res, next) => {
    const doc = await Model.findOneAndDelete({ slug: req.params.slug });
    if (!doc) {
      return next(new SystemError(`${Model.modelName} not found`, 404));
    }
    res.status(200).json({ message: "success", doc });
  });
};
