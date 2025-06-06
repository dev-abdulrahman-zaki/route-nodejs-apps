import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.middleware.js";
import {
  addUserValidationSchema,
  updateUserValidationSchema,
  getAllUsersValidationSchema,
} from "./user.validation.js";
import { isUserExist } from "../../middlewares/isUserExist.middleware.js";
import { authenticate } from "../../middlewares/auth/authenticate.middleware.js";
import { authorize } from "../../middlewares/auth/authorize.middleware.js";
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
  authenticate,
  authorize("admin"),
  validateSchema(addUserValidationSchema),
  isUserExist,
  addUser
);
userRoutes.get(`/`, authenticate, authorize("admin"), validateSchema(getAllUsersValidationSchema), getAllUsers);
userRoutes.get(`/:id`, authenticate, authorize("admin"), getSingleUser);
userRoutes.put(`/:id`, authenticate, authorize("admin"), validateSchema(updateUserValidationSchema), updateUser);
userRoutes.delete(`/:id`, authenticate, authorize("admin"), deleteUser);

export default userRoutes;
