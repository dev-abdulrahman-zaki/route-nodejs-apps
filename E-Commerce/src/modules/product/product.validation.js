import Joi from "joi";
import handleValidValue from "../../utils/handleValidValue.js";

const addProductValidationSchema = Joi.object({
  name: Joi.string().required().trim().min(3),
  description: Joi.string().required().trim().min(10).max(2000),
  imageCover: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/jpg")
      .required(),
    encoding: Joi.string().required(),
    size: Joi.number().max(1000000).required(),
    path: Joi.string().required(),
  }).required(),
  images: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/jpeg", "image/png", "image/jpg")
          .required(),
        encoding: Joi.string().required(),
        size: Joi.number().max(1000000).required(),
        path: Joi.string().required(),
      })
    )
    .min(1)
    .required(),
  price: Joi.number().required().min(0),
  priceAfterDiscount: Joi.number().required().min(0),
  stock: Joi.number().required().min(0),
  category: Joi.string().hex().length(24).required(),
  brand: Joi.string().hex().length(24).required(),
  subcategory: Joi.string().hex().length(24).required(),
  ratingsAverage: Joi.number().min(0).max(5),
  ratingsQuantity: Joi.number().min(0),
});

const updateProductValidationSchema = Joi.object({
  name: Joi.string().trim().min(3),
  description: Joi.string().trim().min(10).max(2000),
  imageCover: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/jpg")
      .required(),
    encoding: Joi.string().required(),
    size: Joi.number().max(1000000).required(),
    path: Joi.string().required(),
  }),
  images: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/jpeg", "image/png", "image/jpg")
          .required(),
        encoding: Joi.string().required(),
        size: Joi.number().max(1000000).required(),
        path: Joi.string().required(),
      })
    )
    .min(1),
  price: Joi.number().min(0),
  priceAfterDiscount: Joi.number().min(0),
  stock: Joi.number().min(0),
  category: Joi.string().hex().length(24),
  brand: Joi.string().hex().length(24),
  subcategory: Joi.string().hex().length(24),
  ratingsAverage: Joi.number().min(0).max(5),
  ratingsQuantity: Joi.number().min(0),
});

const validSortFields = [
  "price",
  "ratingsAverage",
  "ratingsQuantity",
  "name",
  "description",
  "stock",
  "category",
  "subcategory",
  "brand",
  "sold",
  "createdAt",
];

const validSelectFields = [
  "name",
  "slug",
  "description",
  "imageCover",
  "images",
  "price",
  "priceAfterDiscount",
  "sold",
  "stock",
  "category",
  "subcategory",
  "brand",
  "ratingsAverage",
  "ratingsQuantity",
  "createdBy",
  "createdAt",
];

const getAllProductsValidationSchema = Joi.object({
  // ===== 1- Pagination =====
  page: Joi.number().integer().positive().default(1).options({ convert: true }),
  limit: Joi.number()
    .integer()
    .positive()
    .max(100) // Prevents requesting too much data at once
    .default(20)
    .options({ convert: true }),
  // ===== 2- Filter =====
  price: Joi.number().min(0).default("").options({ convert: true }),
  stock: Joi.number().min(0).default("").options({ convert: true }),
  category: Joi.string().default(""),
  subcategory: Joi.string().default(""),
  brand: Joi.string().default(""),
  ratingsAverage: Joi.number()
    .min(0)
    .max(5)
    .default("")
    .options({ convert: true }),
  ratingsQuantity: Joi.number().min(0).default("").options({ convert: true }),
  // ===== 3- Sort =====
  sort: Joi.string()
    .lowercase()
    .custom((queryValue, helpers) =>
      handleValidValue(queryValue, helpers, validSortFields)
    )
    .default("-createdAt"),
  // ===== 4- Select =====
  fields: Joi.string()
    .lowercase()
    .custom((queryValue, helpers) =>
      handleValidValue(queryValue, helpers, validSelectFields)
    )
    .default(""),
  // ===== 5- Search =====
  search: Joi.string().default("").lowercase(),
});

export {
  addProductValidationSchema,
  updateProductValidationSchema,
  getAllProductsValidationSchema,
};
