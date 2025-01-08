import express from "express";
// import { validate } from "../../middlewares/validate.js";
// import { addCategoryValidationSchema, updateCategoryValidationSchema } from "./brand.validation.js";
const productRoutes = express.Router();

import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";

productRoutes.post(`/`, addProduct);
productRoutes.get(`/`, getAllProducts);
productRoutes.get(`/:slug`, getSingleProduct);
productRoutes.put(`/:slug`, updateProduct);
productRoutes.delete(`/:slug`, deleteProduct);

export default productRoutes;
