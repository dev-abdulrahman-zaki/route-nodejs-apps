import Joi from "joi";

const signupValidationSchema = Joi.object({
  name: Joi.string().trim().min(3).required(),
  email: Joi.string().lowercase().trim().email().required(),
  password: Joi.string().min(8).required().trim().messages({
    "string.min": "Password must be at least 8 characters long - from Joi",
  }),
});

const signinValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required().trim(),
});

export { signupValidationSchema, signinValidationSchema };
