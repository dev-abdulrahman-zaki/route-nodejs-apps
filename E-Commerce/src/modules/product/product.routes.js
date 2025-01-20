import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { addProductValidationSchema, updateProductValidationSchema, getAllProductsValidationSchema } from "./product.validation.js";
import fileUpload from "../../services/fileUpload/fileUpload.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
const productRoutes = express.Router();

import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";

productRoutes.post(`/`, checkAuth, fileUpload("products").fields([{ name: "images", maxCount: 10 }, { name: "imageCover", maxCount: 1 }]), validateSchema(addProductValidationSchema), addProduct);
productRoutes.get(`/`, validateSchema(getAllProductsValidationSchema), getAllProducts);
productRoutes.get(`/:slug`, getSingleProduct);
productRoutes.put(`/:slug`, checkAuth, fileUpload("products").fields([{ name: "images", maxCount: 10 }, { name: "imageCover", maxCount: 1 }]), validateSchema(updateProductValidationSchema), updateProduct);
productRoutes.delete(`/:slug`, checkAuth, deleteProduct);

export default productRoutes;
