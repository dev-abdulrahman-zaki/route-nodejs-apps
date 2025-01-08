import Joi from "joi";

const addCategoryValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  slug: Joi.string().required().trim(),
  image: Joi.string().required().trim(),
});

const updateCategoryValidationSchema = Joi.object({
  name: Joi.string().trim(),
  slug: Joi.string().trim(),
  image: Joi.string().trim(),
  id: Joi.string().hex().length(24).required(),
});

export { addCategoryValidationSchema, updateCategoryValidationSchema };
