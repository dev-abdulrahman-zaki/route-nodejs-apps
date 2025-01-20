import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import {
  addUserValidationSchema,
  updateUserValidationSchema,
  getAllUsersValidationSchema,
} from "./user.validation.js";
const userRoutes = express.Router();

import {
  addUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "./user.controller.js";

userRoutes.post(`/`, validateSchema(addUserValidationSchema), isUserExist, addUser);
userRoutes.get(`/`, validateSchema(getAllUsersValidationSchema), getAllUsers);
userRoutes.get(`/:id`, getSingleUser);
userRoutes.put(`/:id`, validateSchema(updateUserValidationSchema), updateUser);
userRoutes.delete(`/:id`, deleteUser);

export default userRoutes;
