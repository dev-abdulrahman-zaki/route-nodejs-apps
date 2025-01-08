import Joi from "joi";

const signupValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().lowercase().trim().email().required(),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long - from Joi",
  }),
  // repassword: Joi.string().valid(Joi.ref("password")).required(),
  age: Joi.number().min(18).max(100),
});

const signinValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export { signupValidationSchema, signinValidationSchema };
