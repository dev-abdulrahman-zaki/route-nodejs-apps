import express from "express";
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

brandRoutes.post(`/`, addBrand);
brandRoutes.get(`/`, getAllBrands);
brandRoutes.get(`/:slug`, getSingleBrand);
brandRoutes.put(`/:slug`, updateBrand);
brandRoutes.delete(`/:slug`, deleteBrand);

export default brandRoutes;
