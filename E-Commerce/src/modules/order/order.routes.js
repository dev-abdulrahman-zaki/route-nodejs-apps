import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.middleware.js";
import {
  createCashOrderValidationSchema,
} from "./cart.validation.js";
import { authenticate } from "../../middlewares/auth/authenticate.middleware.js";
import { authorize } from "../../middlewares/auth/authorize.middleware.js";
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
  authenticate,
  authorize("user"),
  validateSchema(createCashOrderValidationSchema),
  createCashOrder
);
orderRoutes.get(`/`, authenticate, authorize("user"), getOrdersByUser);
orderRoutes.get(`/admin`, authenticate, authorize("admin"), getOrders);
orderRoutes.get(`/:id`, authenticate, authorize("user"), getSingleOrderByUser);
orderRoutes.get(`/admin/:id`, authenticate, authorize("admin"), getSingleOrder);
orderRoutes.post(
  `/create-checkout-session/:cartId`,
  authenticate,
  authorize("user"),
  createCheckoutSession
);
// todo: express.raw({type: "application/json"})
orderRoutes.post(`/stripe/webhook`, express.raw({ type: "application/json" }), stripeWebhook);
export default orderRoutes;
