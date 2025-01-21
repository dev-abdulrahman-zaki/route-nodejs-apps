import express from "express";
import fileUpload from "../../services/fileUpload/fileUpload.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import {
  addReviewValidationSchema,
  updateReviewValidationSchema,
  getAllReviewsValidationSchema,
} from "./review.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import {
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} from "./review.controller.js";

const reviewRoutes = express.Router();
reviewRoutes.post(
  `/`,
  checkAuth,
  allowedTo("user"),
  validateSchema(addReviewValidationSchema),
  addReview
);
reviewRoutes.get(
  `/`,
  validateSchema(getAllReviewsValidationSchema),
  getAllReviews
);
reviewRoutes.get(`/:id`, getSingleReview);
reviewRoutes.put(
  `/:id`,
  checkAuth,
  allowedTo("user"),
  validateSchema(updateReviewValidationSchema),
  updateReview
);
reviewRoutes.delete(`/:id`, checkAuth, allowedTo("user, admin"), deleteReview);

export default reviewRoutes;
