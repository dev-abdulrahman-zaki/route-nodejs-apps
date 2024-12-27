import express from "express";
import { isUserExist } from "../../middlewares/isUserExist.js";
import { signup, login } from "./user.controller.js";

const userRoutes = express.Router();
userRoutes.post(`/signup`, isUserExist, signup);
userRoutes.post(`/login`, login);

export default userRoutes;
