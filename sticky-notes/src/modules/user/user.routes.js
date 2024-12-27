import express from "express";
import { isUserExist } from "../../middlewares/isUserExist.js";
import { signup, signin } from "./user.controller.js";

const userRoutes = express.Router();
userRoutes.post(`/signup`, isUserExist, signup);
userRoutes.post(`/signin`, signin);

export default userRoutes;
