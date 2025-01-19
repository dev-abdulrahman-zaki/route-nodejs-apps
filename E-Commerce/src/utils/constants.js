import Joi from "joi";

export const fileObject = Joi.object({
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
});
