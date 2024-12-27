import express from "express";
const postRoutes = express.Router();

import { addPost, getAllPosts } from "./post.controller.js";

postRoutes.post(`/`, addPost);
postRoutes.get(`/`, getAllPosts);

export default postRoutes;
