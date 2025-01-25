import express from "express";
// import { validateSchema } from "../../middlewares/validateSchema.js";
// import {
// } from "./cart.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import {
  createCashOrder,
  getOrdersByUser,
  getSingleOrderByUser,
  getOrders,
  getSingleOrder,
  createCheckoutSession,
  stripeWebhook,
} from "./order.controller.js";

const orderRoutes = express.Router();
orderRoutes.post(
  `/create-cash-order`,
  checkAuth,
  allowedTo("user"),
  createCashOrder
);
orderRoutes.get(`/`, checkAuth, allowedTo("user"), getOrdersByUser);
orderRoutes.get(`/admin`, checkAuth, allowedTo("admin"), getOrders);
orderRoutes.get(`/:id`, checkAuth, allowedTo("user"), getSingleOrderByUser);
orderRoutes.get(`/admin/:id`, checkAuth, allowedTo("admin"), getSingleOrder);
orderRoutes.post(
  `/create-checkout-session/:cartId`,
  checkAuth,
  allowedTo("user"),
  createCheckoutSession
);
// todo: express.raw({type: "application/json"})
orderRoutes.post(`/stripe/webhook`, express.raw({ type: "application/json" }), stripeWebhook);
export default orderRoutes;
