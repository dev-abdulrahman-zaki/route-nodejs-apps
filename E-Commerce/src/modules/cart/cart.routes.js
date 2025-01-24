import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import {

} from "./cart.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import { addToCart, updateQuantity, removeProductFromCart } from "./cart.controller.js";

const cartRoutes = express.Router();

cartRoutes.post(
  `/`,
  checkAuth,
  allowedTo("user"),
  // validateSchema(addBrandValidationSchema),
  addToCart
);

cartRoutes.patch(
  `/:id`,
  checkAuth,
  allowedTo("user"),
  updateQuantity
);

cartRoutes.delete(
  `/:id`,
  checkAuth,
  allowedTo("user"),
  removeProductFromCart
);

export default cartRoutes;
