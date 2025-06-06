import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.middleware.js";
import { addProductValidationSchema, updateProductValidationSchema, getAllProductsValidationSchema } from "./product.validation.js";
import fileUpload from "../../services/fileUpload/fileUpload.js";
import { authenticate } from "../../middlewares/auth/authenticate.middleware.js";
import { authorize } from "../../middlewares/auth/authorize.middleware.js";
const productRoutes = express.Router();

import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";

productRoutes.post(`/`, authenticate, authorize("admin"), fileUpload("products").fields([{ name: "images", maxCount: 10 }, { name: "imageCover", maxCount: 1 }]), validateSchema(addProductValidationSchema), addProduct);
productRoutes.get(`/`, validateSchema(getAllProductsValidationSchema), getAllProducts);
productRoutes.get(`/:slug`, getSingleProduct);
productRoutes.put(`/:slug`, authenticate, authorize("admin"), fileUpload("products").fields([{ name: "images", maxCount: 10 }, { name: "imageCover", maxCount: 1 }]), validateSchema(updateProductValidationSchema), updateProduct);
productRoutes.delete(`/:slug`, authenticate, authorize("admin"), deleteProduct);

export default productRoutes;
