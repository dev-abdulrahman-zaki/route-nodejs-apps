import express from "express"; // or: import {Router} from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
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
import { checkAuth } from "../../middlewares/checkAuth.js";
const categoryRoutes = express.Router();

// - for /categories/:categorySlug/subcategories routes
categoryRoutes.use("/:categorySlug/subcategories", subCategoryRoutes);

// - for /categories routes
categoryRoutes.post(
  `/`,
  checkAuth,
  fileUpload("categories").single("image"), // parse the request body (form-data) using multer.
  validateSchema(addCategoryValidationSchema), // validate the request body (form-data) after multer parsing it. that's why we use the validate middleware after the fileUpload middleware.
  addCategory
);
categoryRoutes.get(`/`, validateSchema(getAllCategoriesValidationSchema), getAllCategories);
categoryRoutes.get(`/:slug`, getSingleCategory);
categoryRoutes.put(
  `/:slug`,
  checkAuth,
  validateSchema(updateCategoryValidationSchema),
  fileUpload("categories").single("image"),
  updateCategory
);
categoryRoutes.delete(`/:slug`, checkAuth, deleteCategory);

export default categoryRoutes;
