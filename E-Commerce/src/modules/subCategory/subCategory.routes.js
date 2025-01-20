import express from "express"; // or: import {Router} from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import {
  addSubCategoryValidationSchema,
  updateSubCategoryValidationSchema,
  getAllSubCategoriesValidationSchema,
} from "./subCategory.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
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
  checkAuth,
  validateSchema(addSubCategoryValidationSchema),
  addSubCategory
);
subCategoryRoutes.get(
  `/`,
  validateSchema(getAllSubCategoriesValidationSchema),
  getAllSubCategories
);
subCategoryRoutes.get(`/:slug`, getSingleSubCategory);
subCategoryRoutes.put(
  `/:slug`,
  checkAuth,
  validateSchema(updateSubCategoryValidationSchema),
  updateSubCategory
);
subCategoryRoutes.delete(`/:slug`, checkAuth, deleteSubCategory);

export default subCategoryRoutes;
