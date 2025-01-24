import express from "express";
// import { validateSchema } from "../../middlewares/validateSchema.js";
// import {
// } from "./cart.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import { createOrder } from "./order.controller.js";

const orderRoutes = express.Router();

orderRoutes.post(`/`, checkAuth, allowedTo("user"), createOrder);

export default orderRoutes;
