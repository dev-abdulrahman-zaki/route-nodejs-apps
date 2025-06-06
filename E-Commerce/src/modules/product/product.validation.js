import Joi from "joi";
import {
  handleValidValue,
  createNumberFilterSchema,
  createStringFilterSchema,
  createDateFilterSchema,
  fileObjectSchema
} from "../../utils/validationUtils.js";

const addProductValidationSchema = Joi.object({
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  body: Joi.object({
    name: Joi.string().required().trim().min(3),
    description: Joi.string().required().trim().min(10).max(2000),
    price: Joi.number().required().min(0),
    priceAfterDiscount: Joi.number()
      .required()
      .min(0)
      .custom((value, helpers) => {
        const price = helpers.state.ancestors[0].price;
        if (value >= price) {
          return helpers.message(
            "Discounted price must be less than regular price"
          );
        }
        return value;
      }),
    stock: Joi.number().required().min(0),
    category: Joi.string().hex().length(24).required(),
    brand: Joi.string().hex().length(24).required(),
    subcategory: Joi.string().hex().length(24).required(),
    ratingsAverage: Joi.number().min(0).max(5),
    ratingsQuantity: Joi.number().min(0),
  }).default({}),
  // Handle single file upload (.single)
  file: Joi.object().default({}),
  // Handle multiple file upload (.fields in this case)
  files: Joi.object({
    imageCover: Joi.array()
      .items(fileObjectSchema)
      .length(1) // Must have exactly 1 file
      .required(),
    images: Joi.array().items(fileObjectSchema).min(1).max(10).required(),
  }).default({}),
});

const updateProductValidationSchema = Joi.object({
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  body: Joi.object({
    name: Joi.string().trim().min(3),
    description: Joi.string().trim().min(10).max(2000),
    price: Joi.number().min(0),
    priceAfterDiscount: Joi.number()
      .min(0)
      .custom((value, helpers) => {
        const price = helpers.state.ancestors[0].price;
        if (value >= price) {
          return helpers.message(
            "Discounted price must be less than regular price"
          );
        }
        return value;
      }),
    stock: Joi.number().min(0),
    category: Joi.string().hex().length(24),
    brand: Joi.string().hex().length(24),
    subcategory: Joi.string().hex().length(24),
    ratingsAverage: Joi.number().min(0).max(5),
    ratingsQuantity: Joi.number().min(0),
  }).default({}),
  // Handle single file upload (.single)
  file: Joi.object().default({}),
  // Handle multiple file upload (.fields or .array)
  files: Joi.object({
    imageCover: Joi.array().items(fileObjectSchema).length(1), // Must have exactly 1 file
    images: Joi.array().items(fileObjectSchema).min(1).max(10),
  }).default({}),
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
  body: Joi.object().default({}),
  params: Joi.object().default({}),
  query: Joi.object({
    // ===== 1- Filter =====
    price: createNumberFilterSchema(),
    sold: createNumberFilterSchema(),
    stock: createNumberFilterSchema(),
    category: createStringFilterSchema(),
    subcategory: createStringFilterSchema(),
    brand: createStringFilterSchema(),
    ratingsAverage: createNumberFilterSchema()
      // Additional validation for ratingsAverage .custom()
      .custom((value, helpers) => {
        const checkRange = (num) => num >= 0 && num <= 5;
        // Handles: ratingsAverage=4
        if (typeof value === "number") {
          if (!checkRange(value))
            return helpers.message("Rating must be between 0 and 5");
          // Handles: ratingsAverage[gt]=4, ratingsAverage[in]=[3,4,5]
        } else if (typeof value === "object") {
          for (const [key, val] of Object.entries(value)) {
            if (!checkRange(val))
              return helpers.message(
                `Rating value in ${key} must be between 0 and 5`
              );
          }
        }
        return value;
      }),
    ratingsQuantity: createNumberFilterSchema(),
    createdBy: Joi.string().hex().length(24),
    createdAt: createDateFilterSchema()
      // Additional validation for dates to be in the past
      .custom((value, helpers) => {
        const checkPastDate = (date) => date < new Date(); // equivalent to: .less("now") - Date Must be before current time
        if (value instanceof Date) {
          if (!checkPastDate(value))
            return helpers.message("Creation date must be in the past");
        } else if (typeof value === "object") {
          for (const [key, val] of Object.entries(value)) {
            if (!checkPastDate(val))
              return helpers.message(
                `Creation date in ${key} filter must be in the past`
              );
          }
        }
        return value;
      }),
    // ===== 2- Sort =====
    sort: Joi.string()
      .lowercase()
      .custom((queryValue, helpers) =>
        handleValidValue(queryValue, helpers, validSortFields)
      )
      .default("-createdAt"), // Apply default if result of handleValidValue is undefined
    // ===== 3- Select =====
    fields: Joi.string()
      .lowercase()
      .custom((queryValue, helpers) =>
        handleValidValue(queryValue, helpers, validSelectFields)
      ),
    // ===== 4- Search =====
    search: Joi.string().lowercase(),
    // ===== 5- Pagination =====
    page: Joi.number()
      .integer()
      .positive()
      .default(1)
      .options({ convert: true }),
    limit: Joi.number()
      .integer()
      .positive()
      .max(100) // Prevents requesting too much data at once
      .default(20)
      .options({ convert: true }),
  }).default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

export {
  addProductValidationSchema,
  updateProductValidationSchema,
  getAllProductsValidationSchema,
};
