import express from "express";
const noteRoutes = express.Router();

import { addNote, getAllNotes } from "./note.controller.js";

noteRoutes.post(`/`, addNote);
noteRoutes.get(`/`, getAllNotes);

export default noteRoutes;
