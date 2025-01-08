import Joi from "joi";

const addSubCategoryValidationSchema = Joi.object({
  name: Joi.string().required().trim().min(3),
  category: Joi.string().hex().length(24).required(),
});

const updateSubCategoryValidationSchema = Joi.object({
  name: Joi.string().trim().min(3),
  category: Joi.string().hex().length(24),
});

export { addSubCategoryValidationSchema, updateSubCategoryValidationSchema };
