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
  const notes = await Note.find().populate("user");
  res.status(200).json({ message: "success", notes });
};

export { addNote, getAllNotes };
