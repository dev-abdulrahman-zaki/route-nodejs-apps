import express from "express";
const commentRoutes = express.Router();

import { addComment, getAllComments } from "./comment.controller.js";

commentRoutes.post(`/`, addComment);
commentRoutes.get(`/`, getAllComments);

export default commentRoutes;
