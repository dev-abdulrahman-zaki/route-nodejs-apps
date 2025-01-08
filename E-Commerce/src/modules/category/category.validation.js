import Joi from "joi";

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

export { addCategoryValidationSchema, updateCategoryValidationSchema };
