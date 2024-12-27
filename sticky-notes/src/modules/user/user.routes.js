import express from "express";
const userRoutes = express.Router();

import { signup, login } from "./user.controller.js";

userRoutes.post(`/signup`, signup);
userRoutes.post(`/login`, login);

export default userRoutes;
