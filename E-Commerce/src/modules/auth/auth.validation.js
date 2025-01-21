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
    newPassword: Joi.string()
      .min(8)
      .required()
      .trim()
      // Ensure new password is different
      .not(Joi.ref("password"))
      .messages({
        "any.invalid": "New password must be different from current password",
      }),
    confirmNewPassword: Joi.string()
      // Ensure new password is the same as the confirmNewPassword
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({ "any.only": "Passwords must match" }),
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
