import Joi from "joi";

const addSubCategoryValidationSchema = Joi.object({
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  params: Joi.object().default({}),
  body: Joi.object({
    name: Joi.string().required().trim().min(3),
    category: Joi.string().hex().length(24).required(),
  }).default({}),
  file: fileObject.required().default({}),
  ,
  files: Joi.object().default({}),
});

const updateSubCategoryValidationSchema = Joi.object({
  name: Joi.string().trim().min(3),
  category: Joi.string().hex().length(24),
});

export { addSubCategoryValidationSchema, updateSubCategoryValidationSchema };
