import Joi from "joi";
import {
  handleValidValue,
  createDateFilterSchema,
} from "../../utils/validationUtils.js";

const addCouponValidationSchema = Joi.object({
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  params: Joi.object().default({}),
  body: Joi.object({
    code: Joi.string().required().trim().min(3),
    expiresAt: Joi.date().required(),
    discount: Joi.string().required().trim(),
  }).default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

const updateCouponValidationSchema = Joi.object({
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  params: Joi.object().default({}),
  body: Joi.object({
    code: Joi.string().trim().min(3),
    expiresAt: Joi.date(),
    discount: Joi.string().trim(),
  }).default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

const validSortFields = ["expiresAt", "discount"];

const validSelectFields = ["code", "expiresAt", "discount"];

const getAllCouponsValidationSchema = Joi.object({
  params: Joi.object().default({}),
  body: Joi.object().default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
  query: Joi.object({
    // ===== 1- Filter =====
    expiresAt: createDateFilterSchema()
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
    discount: Joi.string().trim(),
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

const getSingleCouponValidationSchema = Joi.object({
  params: Joi.object({
    code: Joi.string().required().trim().min(3),
  }).default({}),
  body: Joi.object().default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
  query: Joi.object().default({}),
});

const deleteCouponValidationSchema = Joi.object({
  params: Joi.object({
    code: Joi.string().required().trim().min(3),
  }).default({}),
  body: Joi.object().default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
  query: Joi.object().default({}),
});

export {
  addCouponValidationSchema,
  updateCouponValidationSchema,
  getAllCouponsValidationSchema,
  getSingleCouponValidationSchema,
  deleteCouponValidationSchema,
};
