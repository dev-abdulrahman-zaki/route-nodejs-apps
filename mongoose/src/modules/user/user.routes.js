import express from "express";
const userRoutes = express.Router();
import {
  addUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from "./user.controller.js";

// 04. Create a new user
userRoutes.post(`/users`, addUser);

// 05. Get all users
userRoutes.get(`/users`, getAllUsers);

// 06 Delete a user
userRoutes.delete(`/users/:id`, deleteUser);

// 07 Update a user
userRoutes.put(`/users/:id`, updateUser);

export default userRoutes;
