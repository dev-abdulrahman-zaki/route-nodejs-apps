import Joi from "joi";

const addNoteValidationSchema = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  // user: Joi.string().required().trim(), // send the user id from the request headers (checkAuth middleware) instead of the request body
});

const updateNoteValidationSchema = Joi.object({
  title: Joi.string().trim(),
  description: Joi.string().trim(),
  id: Joi.string().hex().length(24).required(),
});

export { addNoteValidationSchema, updateNoteValidationSchema };
