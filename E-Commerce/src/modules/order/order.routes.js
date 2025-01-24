import express from "express";
// import { validateSchema } from "../../middlewares/validateSchema.js";
// import {
// } from "./cart.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import {
  createOrder,
  getOrdersByUser,
  getSingleOrderByUser,
  getOrders,
  getSingleOrder,
} from "./order.controller.js";

const orderRoutes = express.Router();
orderRoutes.post(`/`, checkAuth, allowedTo("user"), createOrder);
orderRoutes.get(`/`, checkAuth, allowedTo("user"), getOrdersByUser);
orderRoutes.get(`/:id`, checkAuth, allowedTo("user"), getSingleOrderByUser);
orderRoutes.get(`/admin`, checkAuth, allowedTo("admin"), getOrders);
orderRoutes.get(`/admin/:id`, checkAuth, allowedTo("admin"), getSingleOrder);

export default orderRoutes;
