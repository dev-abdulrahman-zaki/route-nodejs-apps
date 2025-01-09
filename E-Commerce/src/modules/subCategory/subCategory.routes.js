import express from "express"; // or: import {Router} from "express";
import { validate } from "../../middlewares/validate.js";
import {
  addSubCategoryValidationSchema,
  updateSubCategoryValidationSchema,
} from "./subCategory.validation.js";
const subCategoryRoutes = express.Router({ mergeParams: true });

import {
  addSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "./subCategory.controller.js";

subCategoryRoutes.post(
  `/`,
  validate(addSubCategoryValidationSchema),
  addSubCategory
);
subCategoryRoutes.get(`/`, getAllSubCategories);
subCategoryRoutes.get(`/:slug`, getSingleSubCategory);
subCategoryRoutes.put(
  `/:slug`,
  validate(updateSubCategoryValidationSchema),
  updateSubCategory
);
subCategoryRoutes.delete(`/:slug`, deleteSubCategory);

export default subCategoryRoutes;
