import express from "express";
// import { validateSchema } from "../../middlewares/validateSchema.js";
// import {
// } from "./cart.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import {
  addProductToCart,
  updateProductQuantity,
  removeProductFromCart,
  getCart,
  clearCart,
  applyCoupon,
  removeCoupon,
} from "./cart.controller.js";

const cartRoutes = express.Router();

cartRoutes.post(
  `/`,
  checkAuth,
  allowedTo("user"),
  // validateSchema(addBrandValidationSchema),
  addProductToCart
);

cartRoutes.patch(`/:id`, checkAuth, allowedTo("user"), updateProductQuantity);

cartRoutes.delete(`/:id`, checkAuth, allowedTo("user"), removeProductFromCart);

cartRoutes.get(`/`, checkAuth, allowedTo("user"), getCart);

cartRoutes.delete(`/`, checkAuth, allowedTo("user"), clearCart);

cartRoutes.post(`/apply-coupon`, checkAuth, allowedTo("user"), applyCoupon);

cartRoutes.delete(`/remove-coupon`, checkAuth, allowedTo("user"), removeCoupon);

export default cartRoutes;
