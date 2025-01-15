import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { addProductValidationSchema, updateProductValidationSchema, getAllProductsValidationSchema } from "./product.validation.js";
import fileUpload from "../../services/fileUpload/fileUpload.js";
const productRoutes = express.Router();

import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";

productRoutes.post(`/`, fileUpload("products").fields([{ name: "images", maxCount: 10 }, { name: "imageCover", maxCount: 1 }]), validateSchema(addProductValidationSchema), addProduct);
productRoutes.get(`/`, validateSchema(getAllProductsValidationSchema), getAllProducts);
productRoutes.get(`/:slug`, getSingleProduct);
productRoutes.put(`/:slug`, fileUpload("products").fields([{ name: "images", maxCount: 10 }, { name: "imageCover", maxCount: 1 }]), validateSchema(updateProductValidationSchema), updateProduct);
productRoutes.delete(`/:slug`, deleteProduct);

export default productRoutes;
