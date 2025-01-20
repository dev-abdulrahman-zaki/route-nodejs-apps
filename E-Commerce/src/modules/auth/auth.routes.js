import express from "express";
import { signup, signin, verifyEmail } from "./auth.controller.js";
import {
  signupValidationSchema,
  signinValidationSchema,
} from "./auth.validation.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { isUserExist } from "../../middlewares/isUserExist.js";

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
  // ,protectedRoutes - is it like checkAuth?
  validateSchema(changePasswordValidationSchema),
  changePassword
);

export default authRoutes;
