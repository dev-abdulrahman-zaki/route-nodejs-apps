import express from "express";
import fileUpload from "../../services/fileUpload/fileUpload.js";
import { validateSchema } from "../../middlewares/validateSchema.middleware.js";
import {
  addReviewValidationSchema,
  updateReviewValidationSchema,
  getAllReviewsValidationSchema,
} from "./review.validation.js";
import { authenticate } from "../../middlewares/auth/authenticate.middleware.js";
import { authorize } from "../../middlewares/auth/authorize.middleware.js";
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
  authenticate,
  authorize("user"),
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
  authenticate,
  authorize("user"),
  validateSchema(updateReviewValidationSchema),
  updateReview
);
reviewRoutes.delete(
  `/:id`,
  authenticate,
  authorize("user", "admin"),
  deleteReview
);

export default reviewRoutes;
