import express from "express"; // or: import {Router} from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import {
  addSubCategoryValidationSchema,
  updateSubCategoryValidationSchema,
  getAllSubCategoriesValidationSchema,
} from "./subCategory.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
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
  allowedTo("admin"),
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
  allowedTo("admin"),
  validateSchema(updateSubCategoryValidationSchema),
  updateSubCategory
);
subCategoryRoutes.delete(`/:slug`, checkAuth, allowedTo("admin"), deleteSubCategory);

export default subCategoryRoutes;
