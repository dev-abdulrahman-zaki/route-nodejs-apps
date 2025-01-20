import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import {
  addUserValidationSchema,
  updateUserValidationSchema,
  getAllUsersValidationSchema,
} from "./user.validation.js";
import { isUserExist } from "../../middlewares/isUserExist.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
const userRoutes = express.Router();

import {
  addUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "./user.controller.js";

userRoutes.post(
  `/`,
  checkAuth,
  validateSchema(addUserValidationSchema),
  isUserExist,
  addUser
);
userRoutes.get(`/`, checkAuth, validateSchema(getAllUsersValidationSchema), getAllUsers);
userRoutes.get(`/:id`, checkAuth, getSingleUser);
userRoutes.put(`/:id`, checkAuth, validateSchema(updateUserValidationSchema), updateUser);
userRoutes.delete(`/:id`, checkAuth, deleteUser);

export default userRoutes;
