import Joi from "joi";
import {
  handleValidValue,
  createDateFilterSchema,
  fileObjectSchema,
} from "../../utils/validationUtils.js";

const createCashOrderValidationSchema = Joi.object({
  body: Joi.object({
    shippingAddress: Joi.object({
      phone: Joi.string().required(),
      city: Joi.string().required(),
      street: Joi.string().required(),
      building: Joi.string().required(),
      floor: Joi.string().required(),
      flat: Joi.string().required(),
      postalCode: Joi.string().required(),
    }).required(),
  }).default({}),
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

// const validSortFields = ["name", "createdAt"];

// const validSelectFields = ["name", "slug", "logo", "createdBy", "createdAt"];

// const getAllBrandsValidationSchema = Joi.object({
//   params: Joi.object().default({}),
//   body: Joi.object().default({}),
//   file: Joi.object().default({}),
//   files: Joi.object().default({}),
//   query: Joi.object({
//     // ===== 1- Filter =====
//     createdBy: Joi.string().hex().length(24),
//     createdAt: createDateFilterSchema()
//       // Additional validation for dates to be in the past
//       .custom((value, helpers) => {
//         const checkPastDate = (date) => date < new Date(); // equivalent to: .less("now") - Date Must be before current time
//         if (value instanceof Date) {
//           if (!checkPastDate(value))
//             return helpers.message("Creation date must be in the past");
//         } else if (typeof value === "object") {
//           for (const [key, val] of Object.entries(value)) {
//             if (!checkPastDate(val))
//               return helpers.message(
//                 `Creation date in ${key} filter must be in the past`
//               );
//           }
//         }
//         return value;
//       }),
//     // ===== 2- Sort =====
//     sort: Joi.string()
//       .lowercase()
//       .custom((queryValue, helpers) =>
//         handleValidValue(queryValue, helpers, validSortFields)
//       )
//       .default("-createdAt"), // Apply default if result of handleValidValue is undefined
//     // ===== 3- Select =====
//     fields: Joi.string()
//       .lowercase()
//       .custom((queryValue, helpers) =>
//         handleValidValue(queryValue, helpers, validSelectFields)
//       ),
//     // ===== 4- Search =====
//     search: Joi.string().lowercase(),
//     // ===== 5- Pagination =====
//     page: Joi.number()
//       .integer()
//       .positive()
//       .default(1)
//       .options({ convert: true }),
//     limit: Joi.number()
//       .integer()
//       .positive()
//       .max(100) // Prevents requesting too much data at once
//       .default(20)
//       .options({ convert: true }),
//   }).default({}),
// });

export { createCashOrderValidationSchema };
