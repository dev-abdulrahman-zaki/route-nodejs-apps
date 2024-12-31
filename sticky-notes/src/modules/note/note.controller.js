import { Note } from "../../../database/models/note.model.js";
import { User } from "../../../database/models/user.model.js";

const addNote = async (req, res) => {
  const isUserExist = await User.findById(req.body.user);
  if (!isUserExist) {
    return res.status(401).json({ message: "User not found" });
  }
  const note = await Note.insertMany(req.body);
  res.status(201).json({ message: "success", note });
};

const getAllNotes = async (req, res) => {
  const notes = await Note.find().populate("user", "-password"); // or : const notes = await Note.find().populate("user", { password: 0 });
  res.status(200).json({ message: "success", notes });
};

const updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "success", note });
};

const deleteNote = async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.status(200).json({ message: "success", note });
};

export { addNote, getAllNotes, updateNote, deleteNote };
