import express from "express"; // or: import {Router} from "express";
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
noteRoutes.post(`/`, addNote);
noteRoutes.get(`/`, getAllNotes);
noteRoutes.put(`/:id`, updateNote);
noteRoutes.delete(`/:id`, deleteNote);

export default noteRoutes;
