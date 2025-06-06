import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.middleware.js";
import {
  addAddressValidationSchema,
  removeAddressValidationSchema,
} from "./address.validation.js";
import { authenticate } from "../../middlewares/auth/authenticate.middleware.js";
import { authorize } from "../../middlewares/auth/authorize.middleware.js";
import {
  addAddress,
  getAddresses,
  removeAddress,
} from "./address.controller.js";

const addressRoutes = express.Router();

addressRoutes.patch(
  `/`,
  authenticate,
  authorize("user"),
  validateSchema(addAddressValidationSchema),
  addAddress
);

addressRoutes.delete(
  `/:id`,
  authenticate,
  authorize("user", "admin"),
  validateSchema(removeAddressValidationSchema),
  removeAddress
);

addressRoutes.get(`/`, authenticate, authorize("user"), getAddresses);

export default addressRoutes;
