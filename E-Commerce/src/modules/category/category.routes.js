import express from "express"; // or: import {Router} from "express";
import { validateSchema } from "../../middlewares/validateSchema.middleware.js";
import {
  addCategoryValidationSchema,
  updateCategoryValidationSchema,
  getAllCategoriesValidationSchema,
} from "./category.validation.js";
import fileUpload from "../../services/fileUpload/fileUpload.js";
import subCategoryRoutes from "../subCategory/subCategory.routes.js";
import {
  addCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "./category.controller.js";
import { authenticate } from "../../middlewares/auth/authenticate.middleware.js";
import { authorize } from "../../middlewares/auth/authorize.middleware.js";
const categoryRoutes = express.Router();

// - for /categories/:categoryId/subcategories routes
categoryRoutes.use("/:categoryId/subcategories", subCategoryRoutes);

// - for /categories routes
categoryRoutes.post(
  `/`,
  authenticate,
  authorize("admin"),
  fileUpload("categories").single("image"), // parse the request body (form-data) using multer.
  validateSchema(addCategoryValidationSchema), // validate the request body (form-data) after multer parsing it. that's why we use the validate middleware after the fileUpload middleware.
  addCategory
);
categoryRoutes.get(`/`, validateSchema(getAllCategoriesValidationSchema), getAllCategories);
categoryRoutes.get(`/:slug`, getSingleCategory);
categoryRoutes.put(
  `/:slug`,
  authenticate,
  authorize("admin"),
  validateSchema(updateCategoryValidationSchema),
  fileUpload("categories").single("image"),
  updateCategory
);
categoryRoutes.delete(`/:slug`, authenticate, authorize("admin"), deleteCategory);

export default categoryRoutes;
