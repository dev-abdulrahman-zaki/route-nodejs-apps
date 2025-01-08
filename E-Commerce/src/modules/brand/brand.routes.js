import express from "express";
import fileUpload from "../../services/fileUpload/fileUpload.js";
// import { validate } from "../../middlewares/validate.js";
// import { addCategoryValidationSchema, updateCategoryValidationSchema } from "./brand.validation.js";
const brandRoutes = express.Router();

import {
  addBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
} from "./brand.controller.js";

brandRoutes.post(`/`, fileUpload("brands").single("logo"), addBrand);
brandRoutes.get(`/`, getAllBrands);
brandRoutes.get(`/:slug`, getSingleBrand);
brandRoutes.put(`/:slug`, fileUpload("brands").single("logo"), updateBrand);
brandRoutes.delete(`/:slug`, deleteBrand);

export default brandRoutes;
