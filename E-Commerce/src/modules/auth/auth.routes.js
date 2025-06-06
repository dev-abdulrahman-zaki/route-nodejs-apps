import express from "express";
import {
  signup,
  signin,
  verifyEmail,
  changePassword,
} from "./auth.controller.js";
import {
  signupValidationSchema,
  signinValidationSchema,
  changePasswordValidationSchema,
} from "./auth.validation.js";
import { validateSchema } from "../../middlewares/validateSchema.middleware.js";
import { isUserExist } from "../../middlewares/isUserExist.middleware.js";
import { authenticate } from "../../middlewares/auth/authenticate.middleware.js";

const authRoutes = express.Router();
authRoutes.post(
  `/signup`,
  validateSchema(signupValidationSchema),
  isUserExist,
  signup
);
authRoutes.post(`/signin`, validateSchema(signinValidationSchema), signin);
authRoutes.get(`/verify/:token`, verifyEmail);
authRoutes.patch(
  `/change-password`,
  authenticate,
  validateSchema(changePasswordValidationSchema),
  changePassword
);

export default authRoutes;
