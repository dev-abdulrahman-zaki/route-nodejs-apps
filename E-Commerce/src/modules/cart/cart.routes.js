import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.middleware.js";
import { addProductToCartValidationSchema, updateProductQuantityValidationSchema, removeProductFromCartValidationSchema } from "./cart.validation.js";
import { authenticate } from "../../middlewares/auth/authenticate.middleware.js";
import { authorize } from "../../middlewares/auth/authorize.middleware.js";
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

cartRoutes.post(`/apply-coupon`, authenticate, authorize("user"), applyCoupon);
cartRoutes.delete(
  `/remove-coupon`,
  authenticate,
  authorize("user"),
  removeCoupon
);

cartRoutes.post(
  `/`,
  authenticate,
  authorize("user"),
  validateSchema(addProductToCartValidationSchema),
  addProductToCart
);
cartRoutes.get(`/`, authenticate, authorize("user"), getCart);
cartRoutes.delete(`/`, authenticate, authorize("user"), clearCart);

cartRoutes.delete(
  `/:id`,
  authenticate,
  authorize("user"),
  validateSchema(removeProductFromCartValidationSchema),
  removeProductFromCart
);
cartRoutes.patch(
  `/:id`,
  authenticate,
  authorize("user"),
  validateSchema(updateProductQuantityValidationSchema), 
  updateProductQuantity
);

/*
Note:
Express processes routes in the order they’re defined.
If the route /remove-coupon comes after a route like /cart/:id, Express might interpret remove-coupon as the dynamic :id parameter.
To fix this, place static routes before dynamic ones.
error: "message": "Cast to ObjectId failed for value \"remove-coupon\" (type string) at path \"_id\" because of \"BSONError\""
*/

export default cartRoutes;
