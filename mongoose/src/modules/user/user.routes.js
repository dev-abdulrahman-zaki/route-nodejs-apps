import express from "express";
const userRoutes = express.Router(); // index.js: app.use("/users", userRoutes);
/*
or:
Destructing Router from express, instead of express.Router()
import express, {Router} from "express"
const userRoutes = Router();
*/

import {
  addUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from "./user.controller.js";

// Route Definitions are where you define the specific HTTP methods and endpoints within your router file. These are in your user.routes.js
// Without /users since we already used it in index.js: app.use("/users", userRoutes);
// defined the base path in index.js: /users
// 04. Create a new user
userRoutes.post(`/`, addUser);

// 05. Get all users
userRoutes.get(`/`, getAllUsers);

// 06 Delete a user
userRoutes.delete(`/:id`, deleteUser);

// 07 Update a user
userRoutes.put(`/:id`, updateUser);

/*
or:
userRoutes.route("/").post(addUser).get(getAllUsers).delete(deleteUser).put(updateUser);
*/

export default userRoutes;
