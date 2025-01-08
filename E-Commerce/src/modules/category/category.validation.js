import Joi from "joi";

const addCategoryValidationSchema = Joi.object({
  name: Joi.string().required().trim().min(3),
  slug: Joi.string().required().trim().min(3),
  image: Joi.string().required().trim(),
});

const updateCategoryValidationSchema = Joi.object({
  name: Joi.string().trim().min(3),
  slug: Joi.string().trim().min(3),
  image: Joi.string().trim(),
});

export { addCategoryValidationSchema, updateCategoryValidationSchema };
