import express from "express";
// import { validate } from "../../middlewares/validate.js";
// import { addCategoryValidationSchema, updateCategoryValidationSchema } from "./brand.validation.js";
import fileUpload from "../../services/fileUpload/fileUpload.js";
const productRoutes = express.Router();

import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";

productRoutes.post(`/`, fileUpload("products").fields([{ name: "images", maxCount: 10 }, { name: "imageCover", maxCount: 1 }]), addProduct);
productRoutes.get(`/`, getAllProducts);
productRoutes.get(`/:slug`, getSingleProduct);
productRoutes.put(`/:slug`, fileUpload("products").fields([{ name: "images", maxCount: 10 }, { name: "imageCover", maxCount: 1 }]), updateProduct);
productRoutes.delete(`/:slug`, deleteProduct);

export default productRoutes;
