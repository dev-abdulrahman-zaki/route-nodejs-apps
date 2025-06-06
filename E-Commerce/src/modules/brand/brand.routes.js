import express from "express";
import fileUpload from "../../services/fileUpload/fileUpload.js";
import { validateSchema } from "../../middlewares/validateSchema.middleware.js";
import {
  addBrandValidationSchema,
  updateBrandValidationSchema,
  getAllBrandsValidationSchema,
} from "./brand.validation.js";
import { authenticate } from "../../middlewares/auth/authenticate.middleware.js";
import { authorize } from "../../middlewares/auth/authorize.middleware.js";
const brandRoutes = express.Router();

import {
  addBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
} from "./brand.controller.js";

brandRoutes.post(
  `/`,
  authenticate,
  authorize("admin"),
  fileUpload("brands").single("logo"),
  validateSchema(addBrandValidationSchema),
  addBrand
);
brandRoutes.get(
  `/`,
  validateSchema(getAllBrandsValidationSchema),
  getAllBrands
);
brandRoutes.get(`/:slug`, getSingleBrand);
brandRoutes.put(
  `/:slug`,
  authenticate,
  authorize("admin"),
  fileUpload("brands").single("logo"),
  validateSchema(updateBrandValidationSchema),
  updateBrand
);
brandRoutes.delete(`/:slug`, authenticate, authorize("admin"), deleteBrand);

export default brandRoutes;
