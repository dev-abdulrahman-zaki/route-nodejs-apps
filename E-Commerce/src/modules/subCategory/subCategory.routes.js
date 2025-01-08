import express from "express"; // or: import {Router} from "express";
// import { validate } from "../../middlewares/validate.js";
// import { addCategoryValidationSchema, updateCategoryValidationSchema } from "./category.validation.js";
const subCategoryRoutes = express.Router();

import {
  addSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "./subCategory.controller.js";

subCategoryRoutes.post(`/`, addSubCategory);
subCategoryRoutes.get(`/`, getAllSubCategories);
subCategoryRoutes.get(`/:slug`, getSingleSubCategory);
subCategoryRoutes.put(`/:slug`, updateSubCategory);
subCategoryRoutes.delete(`/:slug`, deleteSubCategory);

export default subCategoryRoutes;
