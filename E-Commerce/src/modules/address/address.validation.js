import Joi from "joi";

const addAddressValidationSchema = Joi.object({
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  params: Joi.object().default({}),
  body: Joi.object({
    city: Joi.string().trim().required(),
    street: Joi.string().trim().required(),
    phone: Joi.string().trim().required(),
    // building: Joi.string().trim().required(),
    // floor: Joi.string().trim().required(),
    // flat: Joi.string().trim().required(),
    // postalCode: Joi.string().trim().required(),
  }).default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

const removeAddressValidationSchema = Joi.object({
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  params: Joi.object({
    id: Joi.string().hex().length(24).trim().required(),
  }).default({}),
  body: Joi.object().default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

export { addAddressValidationSchema, removeAddressValidationSchema };
