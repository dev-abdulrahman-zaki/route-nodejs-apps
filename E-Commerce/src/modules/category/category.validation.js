import Joi from "joi";
import handleValidValue from "../../utils/handleValidValue.js";

const addCategoryValidationSchema = Joi.object({
  name: Joi.string().required().trim().min(3),
  image: Joi.object({
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
});

const updateCategoryValidationSchema = Joi.object({
  name: Joi.string().trim().min(3),
  image: Joi.object({
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
});

const validSortFields = ["createdAt"];

const validSelectFields = ["name", "slug", "image", "createdBy", "createdAt"];

const getAllCategoriesValidationSchema = Joi.object({
  // ===== 1- Filter =====
  // ===== 2- Sort =====
  sort: Joi.string()
  .lowercase()
  .custom((queryValue, helpers) =>
    handleValidValue(queryValue, helpers, validSortFields)
  )
  .default("-createdAt"),
  // ===== 3- Select =====
  fields: Joi.string()
    .lowercase()
    .custom((queryValue, helpers) =>
      handleValidValue(queryValue, helpers, validSelectFields)
    )
    .default(""),
  // ===== 4- Search =====
  search: Joi.string().default("").lowercase(),
  // ===== 5- Pagination =====
  page: Joi.number().integer().positive().default(1).options({ convert: true }),
  limit: Joi.number()
    .integer()
    .positive()
    .max(100) // Prevents requesting too much data at once
    .default(20)
    .options({ convert: true }),
});

export {
  addCategoryValidationSchema,
  updateCategoryValidationSchema,
  getAllCategoriesValidationSchema,
};
