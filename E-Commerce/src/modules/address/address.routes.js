import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import {
  addAddressValidationSchema,
  removeAddressValidationSchema,
} from "./address.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import {
  addAddress,
  getAddresses,
  removeAddress,
} from "./address.controller.js";

const addressRoutes = express.Router();

addressRoutes.patch(
  `/`,
  checkAuth,
  allowedTo("user"),
  validateSchema(addAddressValidationSchema),
  addAddress
);

addressRoutes.delete(
  `/:id`,
  checkAuth,
  allowedTo("user", "admin"),
  validateSchema(removeAddressValidationSchema),
  removeAddress
);

addressRoutes.get(`/`, checkAuth, allowedTo("user"), getAddresses);

export default addressRoutes;
