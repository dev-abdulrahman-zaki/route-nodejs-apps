import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { isUserExist } from "../../middlewares/isUserExist.js";
import { signup, signin, verifyEmail } from "./user.controller.js";
import { signupValidationSchema, signinValidationSchema } from "./user.validation.js";

const userRoutes = express.Router();
userRoutes.post(`/signup`, validateSchema(signupValidationSchema), isUserExist, signup);
userRoutes.post(`/signin`, validateSchema(signinValidationSchema), signin);
userRoutes.get(`/verify/:token`, verifyEmail);

export default userRoutes;
