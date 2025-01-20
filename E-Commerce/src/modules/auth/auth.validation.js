import Joi from "joi";

const signupValidationSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().lowercase().trim().email().required(),
    password: Joi.string().min(8).required().trim().messages({
      "string.min": "Password must be at least 8 characters long - from Joi",
    }),
  }).default({}),
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

const signinValidationSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required().trim(),
  }).default({}),
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

const changePasswordValidationSchema = Joi.object({
  body: Joi.object({
    password: Joi.string().min(8).required().trim(),
    newPassword: Joi.string().min(8).required().trim(),
  }).default({}),
  params: Joi.object().default({}),
  query: Joi.object().default({}),
  file: Joi.object().default({}),
  files: Joi.object().default({}),
});

export {
  signupValidationSchema,
  signinValidationSchema,
  changePasswordValidationSchema,
};
