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

cartRoutes.post(`/apply-coupon`, checkAuth, allowedTo("user"), applyCoupon);
cartRoutes.delete(`/remove-coupon`, checkAuth, allowedTo("user"), removeCoupon);

cartRoutes.post(
  `/`,
  checkAuth,
  allowedTo("user"),
  // validateSchema(addBrandValidationSchema),
  addProductToCart
);
cartRoutes.get(`/`, checkAuth, allowedTo("user"), getCart);
cartRoutes.delete(`/`, checkAuth, allowedTo("user"), clearCart);

cartRoutes.delete(`/:id`, checkAuth, allowedTo("user"), removeProductFromCart);
cartRoutes.patch(`/:id`, checkAuth, allowedTo("user"), updateProductQuantity);

/*
Note:
Express processes routes in the order they’re defined.
If the route /remove-coupon comes after a route like /cart/:id, Express might interpret remove-coupon as the dynamic :id parameter.
To fix this, place static routes before dynamic ones.
error: "message": "Cast to ObjectId failed for value \"remove-coupon\" (type string) at path \"_id\" because of \"BSONError\""
*/

export default cartRoutes;
