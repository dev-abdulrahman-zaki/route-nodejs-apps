import express from "express"; // or: import {Router} from "express";
import { validate } from "../../middlewares/validate.js";
import {
  addCategoryValidationSchema,
  updateCategoryValidationSchema,
} from "./category.validation.js";
import fileUpload from "../../services/fileUpload/fileUpload.js";
const categoryRoutes = express.Router();

import {
  addCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "./category.controller.js";

categoryRoutes.post(
  `/`,
  fileUpload("categories").single("image"), // parse the request body (form-data) using multer.
  validate(addCategoryValidationSchema, "image"), // validate the request body (form-data) after multer parsing it. that's why we use the validate middleware after the fileUpload middleware.
  addCategory
);
categoryRoutes.get(`/`, getAllCategories);
categoryRoutes.get(`/:slug`, getSingleCategory);
categoryRoutes.put(
  `/:slug`,
  validate(updateCategoryValidationSchema, "image"),
  fileUpload("categories").single("image"),
  updateCategory
);
categoryRoutes.delete(`/:slug`, deleteCategory);

export default categoryRoutes;
