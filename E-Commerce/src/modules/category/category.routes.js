import express from "express"; // or: import {Router} from "express";
import { validate } from "../../middlewares/validate.js";
import { addCategoryValidationSchema, updateCategoryValidationSchema } from "./category.validation.js";
const categoryRoutes = express.Router();

import {
  addCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "./category.controller.js";

categoryRoutes.post(`/`, validate(addCategoryValidationSchema), addCategory);
categoryRoutes.get(`/`, getAllCategories);
categoryRoutes.get(`/:slug`, getSingleCategory);
categoryRoutes.put(`/:slug`, validate(updateCategoryValidationSchema), updateCategory);
categoryRoutes.delete(`/:slug`, deleteCategory);

export default categoryRoutes;
