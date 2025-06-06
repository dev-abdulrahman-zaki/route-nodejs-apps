import { Review } from "../../database/models/review.model.js";
import { catchError } from "../../middlewares/error/catchError.middleware.js";
import { SystemError } from "../../utils/systemError.js";
import { getAll } from "../../utils/factoryHandlers.js";
import { Product } from "../../database/models/product.model.js";

const addReview = catchError(async (req, res, next) => {
  const isProductExist = await Product.findById(req.body.product);
  if (!isProductExist) {
    return next(new SystemError("Product not found", 404));
  }
  req.body.createdBy = req.user.id;
  const isReviewExist = await Review.findOne({
    createdBy: req.body.createdBy,
    product: req.body.product,
  });
  if (isReviewExist) {
    return next(new SystemError("You already reviewed this product", 400));
  }
  const review = new Review(req.body);
  await review.save();
  res.status(201).json({ message: "success", review });
});

const getAllReviews = getAll(Review, ["comment"]);

const getSingleReview = catchError(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  // .populate(
  //   "createdBy",
  //   "-password -email -confirmEmail -createdAt"
  // );
  if (!review) {
    return next(new SystemError("Review not found", 404));
  }
  res.status(200).json({ message: "success", review });
});

const updateReview = catchError(async (req, res, next) => {
  const review = await Review.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    req.body,
    {
      new: true,
    }
  );
  if (!review) {
    return next(new SystemError("Review not found", 404));
  }
  res.status(200).json({ message: "success", review });
});

const deleteReview = catchError(async (req, res, next) => {
  const review = await Review.findOneAndDelete(
    {
      _id: req.params.id,
      ...(req.user.role === "user" && { createdBy: req.user.id }),
    },
    req.body,
    {
      new: true,
    }
  );
  if (!review) {
    return next(new SystemError("Review not found", 404));
  }
  res.status(200).json({ message: "success", review });
});

export {
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
