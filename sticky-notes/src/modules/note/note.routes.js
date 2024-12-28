import express from "express"; // or: import {Router} from "express";
const noteRoutes = express.Router();

import {
  addNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "./note.controller.js";

noteRoutes.post(`/`, addNote);
noteRoutes.get(`/`, getAllNotes);
noteRoutes.put(`/:id`, updateNote);
noteRoutes.delete(`/:id`, deleteNote);

export default noteRoutes;
