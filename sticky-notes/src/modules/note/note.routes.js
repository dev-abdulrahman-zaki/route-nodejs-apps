import express from "express"; // or: import {Router} from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { addNoteValidationSchema, updateNoteValidationSchema } from "./note.validation.js";
const noteRoutes = express.Router();

import {
  addNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "./note.controller.js";

// index.js: app.use("/notes", checkAuth, noteRoutes); // check auth before accessing the routes
/*
or: noteRoutes.use(checkAuth);
*/
noteRoutes.post(`/`, validateSchema(addNoteValidationSchema), addNote);
noteRoutes.get(`/`, getAllNotes);
noteRoutes.put(`/:id`, validateSchema(updateNoteValidationSchema), updateNote);
noteRoutes.delete(`/:id`, deleteNote);

export default noteRoutes;
