import Joi from "joi";

const addNoteValidationSchema = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string().required().trim()
});

const updateNoteValidationSchema = Joi.object({
  title: Joi.string().trim(),
  description: Joi.string().trim(),
  id: Joi.string().hex().length(24).required(),
});

export { addNoteValidationSchema, updateNoteValidationSchema };
