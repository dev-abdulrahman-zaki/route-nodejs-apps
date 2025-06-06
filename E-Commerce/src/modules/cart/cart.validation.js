import Joi from "joi";

const addProductToCartValidationSchema = Joi.object({
  body: Joi.object({
    product: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().positive().default(1).min(1).options({
      convert: true,
    }),
  }).default(),
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

const updateProductQuantityValidationSchema = Joi.object({
  body: Joi.object({
    quantity: Joi.number().integer().positive().default(1).min(1).options({
      convert: true,
    }),
  }).default({}),
  params: Joi.object({
    id: Joi.string().hex().length(24).trim().required(),
  }).default({}),
  query: Joi.object().default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

const removeProductFromCartValidationSchema = Joi.object({
  body: Joi.object().default({}),
  params: Joi.object({
    id: Joi.string().hex().length(24).trim().required(),
  }).default({}),
  query: Joi.object().default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

const applyCouponValidationSchema = Joi.object({
  body: Joi.object({
    code: Joi.string().trim().min(3).required(),
  }).default({}),
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

export {
  addProductToCartValidationSchema,
  updateProductQuantityValidationSchema,
  removeProductFromCartValidationSchema,
  applyCouponValidationSchema,
};
