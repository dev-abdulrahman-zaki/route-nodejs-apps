import express from "express";
import { validate } from "../../middlewares/validate.js";
import { isUserExist } from "../../middlewares/isUserExist.js";
import { signup, signin, verifyEmail } from "./user.controller.js";
import { signupValidationSchema, signinValidationSchema } from "./user.validation.js";

const userRoutes = express.Router();
userRoutes.post(`/signup`, validate(signupValidationSchema), isUserExist, signup);
userRoutes.post(`/signin`, validate(signinValidationSchema), signin);
userRoutes.get(`/verify/:token`, verifyEmail);

export default userRoutes;
