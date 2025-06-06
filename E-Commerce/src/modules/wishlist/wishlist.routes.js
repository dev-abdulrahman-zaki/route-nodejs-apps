import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.middleware.js";
import {
  addToWishlistValidationSchema,
  removeFromWishlistValidationSchema,
} from "./wishlist.validation.js";
import { authenticate } from "../../middlewares/auth/authenticate.middleware.js";
import { authorize } from "../../middlewares/auth/authorize.middleware.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "./wishlist.controller.js";

const wishlistRoutes = express.Router();

wishlistRoutes.patch(
  `/`,
  authenticate,
  authorize("user"),
  validateSchema(addToWishlistValidationSchema),
  addToWishlist
);

wishlistRoutes.delete(
  `/:id`,
  authenticate,
  authorize("user"),
  validateSchema(removeFromWishlistValidationSchema),
  removeFromWishlist
);

wishlistRoutes.get(`/`, authenticate, authorize("user"), getWishlist);

export default wishlistRoutes;
