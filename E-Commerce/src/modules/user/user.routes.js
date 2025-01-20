import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import {
  addUserValidationSchema,
  updateUserValidationSchema,
  getAllUsersValidationSchema,
} from "./user.validation.js";
import { isUserExist } from "../../middlewares/isUserExist.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
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
  allowedTo("admin"),
  validateSchema(addUserValidationSchema),
  isUserExist,
  addUser
);
userRoutes.get(`/`, checkAuth, allowedTo("admin"), validateSchema(getAllUsersValidationSchema), getAllUsers);
userRoutes.get(`/:id`, checkAuth, allowedTo("admin"), getSingleUser);
userRoutes.put(`/:id`, checkAuth, allowedTo("admin"), validateSchema(updateUserValidationSchema), updateUser);
userRoutes.delete(`/:id`, checkAuth, allowedTo("admin"), deleteUser);

export default userRoutes;
