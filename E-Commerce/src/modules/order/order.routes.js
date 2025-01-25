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
  createCardOrder,
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
  `/create-card-order/:cartId`,
  checkAuth,
  allowedTo("user"),
  createCardOrder
);

export default orderRoutes;
