import Joi from "joi";
import {
  handleValidValue,
  createDateFilterSchema,
  createNumberFilterSchema,
} from "../../utils/validationUtils.js";

const addReviewValidationSchema = Joi.object({
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  params: Joi.object().default({}),
  body: Joi.object({
    comment: Joi.string().required().trim().min(3),
    product: Joi.string().hex().length(24).required(),
    rating: Joi.number().required().min(0).max(5),
  }).default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

const updateReviewValidationSchema = Joi.object({
  query: Joi.object().default({}),
  params: Joi.object({
    id: Joi.string().hex().length(24).trim().required(),
  }).default({}),
  body: Joi.object({
    comment: Joi.string().trim().min(3),
    rating: Joi.number().min(0).max(5),
  }).default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

const validSortFields = ["comment", "product", "createdAt", "rating"];

const validSelectFields = [
  "comment",
  "rating",
  "product",
  "createdBy",
  "createdAt",
];

const getAllReviewsValidationSchema = Joi.object({
  params: Joi.object().default({}),
  body: Joi.object().default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
  query: Joi.object({
    // ===== 1- Filter =====
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
    product: Joi.string().hex().length(24),
    rating: createNumberFilterSchema()
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
});

export {
  addReviewValidationSchema,
  updateReviewValidationSchema,
  getAllReviewsValidationSchema,
};
