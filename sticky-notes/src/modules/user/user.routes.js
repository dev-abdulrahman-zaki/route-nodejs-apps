import express from "express";
import { isUserExist } from "../../middlewares/isUserExist.js";
import { signup, signin, verifyEmail } from "./user.controller.js";

const userRoutes = express.Router();
userRoutes.post(`/signup`, isUserExist, signup);
userRoutes.post(`/signin`, signin);
userRoutes.get(`/verify/:token`, verifyEmail);

export default userRoutes;
