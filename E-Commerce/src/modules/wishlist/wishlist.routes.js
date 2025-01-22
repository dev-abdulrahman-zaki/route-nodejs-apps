import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import {
  addToWishlistValidationSchema,
  removeFromWishlistValidationSchema,
} from "./wishlist.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "./wishlist.controller.js";

const wishlistRoutes = express.Router();

wishlistRoutes.patch(
  `/`,
  checkAuth,
  allowedTo("user"),
  validateSchema(addToWishlistValidationSchema),
  addToWishlist
);

wishlistRoutes.delete(
  `/:id`,
  checkAuth,
  allowedTo("user"),
  validateSchema(removeFromWishlistValidationSchema),
  removeFromWishlist
);

wishlistRoutes.get(`/`, checkAuth, allowedTo("user"), getWishlist);

export default wishlistRoutes;
