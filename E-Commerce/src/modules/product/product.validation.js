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

const createNumberFilterSchema = () =>
  Joi.alternatives()
    .try(
      Joi.number(),
      Joi.object({
        gt: Joi.number(), // ✓ price[gt]=100
        gte: Joi.number(), // ✓ price[gte]=100
        lt: Joi.number(), // ✓ price[lt]=200
        lte: Joi.number(), // ✓ price[lte]=200
        eq: Joi.number(), // ✓ price[eq]=100
        ne: Joi.number(), // ✓ price[ne]=100
        in: Joi.array().items(Joi.number()).single(), // ✓ price[in]=100,200,300
        nin: Joi.array().items(Joi.number()).single(), // ✓ price[nin]=100,200,300
        exists: Joi.boolean(), // ✓ price[exists]=true
        regex: Joi.string(), // ✓ price[regex]=^[0-9]+$
      }).min(0)
    )
    .default(undefined)
    .options({ convert: true });

const createStringFilterSchema = () =>
  Joi.alternatives()
    .try(
      Joi.string(),
      Joi.object({
        eq: Joi.string(), // ✓ brand[eq]=apple
        ne: Joi.string(), // ✓ brand[ne]=apple
        in: Joi.alternatives().try(
          Joi.array().items(Joi.string()),
          Joi.string() // ✓ both category[in]=["id1","id2"] and category[in]=id1,id2
        ),
        nin: Joi.alternatives().try(
          Joi.array().items(Joi.string()),
          Joi.string()
        ),
        regex: Joi.string(), // ✓ brand[regex]=apple
        exists: Joi.boolean(), // ✓ brand[exists]=true
      }).min(1)
    )
    .default(undefined);

const createDateFilterSchema = () =>
  Joi.alternatives()
    .try(
      Joi.date(),
      Joi.object({
        gt: Joi.date(), // ✓ createdAt[gt]=2024-01-15
        gte: Joi.date(), // ✓ createdAt[gte]=2024-01-15
        lt: Joi.date(), // ✓ createdAt[lt]=2024-01-15
        lte: Joi.date(), // ✓ createdAt[lte]=2024-01-15
        eq: Joi.date(), // ✓ createdAt[eq]=2024-01-15
        ne: Joi.date(), // ✓ createdAt[ne]=2024-01-15
        exists: Joi.boolean(), // ✓ createdAt[exists]=true
      }).min(1)
    )
    .default(undefined);

const getAllProductsValidationSchema = Joi.object({
  // ===== 1- Filter =====
  price: createNumberFilterSchema(),
  sold: createNumberFilterSchema(),
  stock: createNumberFilterSchema(),
  category: createStringFilterSchema(),
  subcategory: createStringFilterSchema(),
  brand: createStringFilterSchema(),
  ratingsAverage: Joi.number()
    .min(0)
    .max(5)
    .default("")
    .options({ convert: true }),
  // ratingsAverage: createNumberFilterSchema()
  // .custom((value, helpers) => {
  //   // Additional validation for rating range
  //   const checkRange = (num) => num >= 0 && num <= 5;
  //   if (typeof value === 'number') {
  //     if (!checkRange(value)) return helpers.error('number.max');
  //   } else if (typeof value === 'object') {
  //     for (const [key, val] of Object.entries(value)) {
  //       if (!checkRange(val)) return helpers.error('number.max');
  //     }
  //   }
  //   return value;
  // })
  ratingsQuantity: createNumberFilterSchema(),
  createdBy: Joi.string().hex().length(24).default(""),
  createdAt: Joi.date().less("now"), // Must be before current time
  // createdAt: createDateFilterSchema()
  // .custom((value, helpers) => {
  //   // Additional validation for dates to be in the past
  //   const checkPastDate = (date) => date < new Date();
  //   if (value instanceof Date) {
  //     if (!checkPastDate(value)) return helpers.error('date.max');
  //   } else if (typeof value === 'object') {
  //     for (const [key, val] of Object.entries(value)) {
  //       if (!checkPastDate(val)) return helpers.error('date.max');
  //     }
  //   }
  //   return value;
  // })
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
    )
    .default(""),
  // ===== 4- Search =====
  search: Joi.string().lowercase().default(""),
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
  addProductValidationSchema,
  updateProductValidationSchema,
  getAllProductsValidationSchema,
};
