import express from "express";
import fileUpload from "../../services/fileUpload/fileUpload.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import {
  addBrandValidationSchema,
  updateBrandValidationSchema,
  getAllBrandsValidationSchema,
} from "./brand.validation.js";
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
  fileUpload("brands").single("logo"),
  validateSchema(updateBrandValidationSchema),
  updateBrand
);
brandRoutes.delete(`/:slug`, deleteBrand);

export default brandRoutes;
