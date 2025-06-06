import express from "express"; // or: import {Router} from "express";
import { validateSchema } from "../../middlewares/validateSchema.middleware.js";
import {
  addSubCategoryValidationSchema,
  updateSubCategoryValidationSchema,
  getAllSubCategoriesValidationSchema,
} from "./subCategory.validation.js";
import { authenticate } from "../../middlewares/auth/authenticate.middleware.js";
import { authorize } from "../../middlewares/auth/authorize.middleware.js";
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
  authenticate,
  authorize("admin"),
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
  authenticate,
  authorize("admin"),
  validateSchema(updateSubCategoryValidationSchema),
  updateSubCategory
);
subCategoryRoutes.delete(`/:slug`, authenticate, authorize("admin"), deleteSubCategory);

export default subCategoryRoutes;
