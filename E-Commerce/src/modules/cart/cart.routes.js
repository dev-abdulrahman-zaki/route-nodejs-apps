import express from "express";
// import { validateSchema } from "../../middlewares/validateSchema.js";
// import {
// } from "./cart.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import {
  addToCart,
  updateQuantity,
  removeProductFromCart,
  getCart,
  clearCart,
} from "./cart.controller.js";

const cartRoutes = express.Router();

cartRoutes.post(
  `/`,
  checkAuth,
  allowedTo("user"),
  // validateSchema(addBrandValidationSchema),
  addToCart
);

cartRoutes.patch(`/:id`, checkAuth, allowedTo("user"), updateQuantity);

cartRoutes.delete(`/:id`, checkAuth, allowedTo("user"), removeProductFromCart);

cartRoutes.get(`/`, checkAuth, allowedTo("user"), getCart);

cartRoutes.delete(`/`, checkAuth, allowedTo("user"), clearCart);

export default cartRoutes;
