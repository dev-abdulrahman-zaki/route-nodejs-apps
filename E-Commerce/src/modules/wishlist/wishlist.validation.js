import Joi from "joi";
import {
  handleValidValue,
  createDateFilterSchema,
} from "../../utils/validationUtils.js";

const addToWishlistValidationSchema = Joi.object({
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  params: Joi.object().default({}),
  body: Joi.object({
    product: Joi.string().hex().length(24).trim().required(),
  }).default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

const removeFromWishlistValidationSchema = Joi.object({
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  params: Joi.object({
    id: Joi.string().hex().length(24).trim().required(),
  }).default({}),
  body: Joi.object().default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

export {
  addToWishlistValidationSchema,
  removeFromWishlistValidationSchema,
  getWishlistValidationSchema,
};
