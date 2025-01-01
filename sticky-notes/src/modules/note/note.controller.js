import { Note } from "../../../database/models/note.model.js";
import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { SystemError } from "../../utils/systemError.js";

const addNote = catchError(async (req, res, next) => {
  // 01. send the user id from the request body
  // const isUserExist = await User.findById(req.body.user);
  // 02. send the user id from the request headers (checkAuth middleware)
  const isUserExist = await User.findById(req.user.id);
  if (!isUserExist) {
    return next(new SystemError("User not found", 401));
  }
  req.body.user = isUserExist._id; // used with 02 to add the user id to the note, because the user is required in the note schema.
  const note = await Note.insertMany(req.body);
  res.status(201).json({ message: "success", note: note[0] });
});

const getAllNotes = catchError(async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).populate(
    "user",
    "-password -email -confirmEmail -createdAt"
  ); // or : const notes = await Note.find().populate("user", { password: 0 });
  res.status(200).json({ message: "success", notes });
});

const updateNote = catchError(async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "success", note });
});

const deleteNote = catchError(async (req, res, next) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) {
    return next(new SystemError("Note not found", 404));
  }
  res.status(200).json({ message: "success", note });
});

export { addNote, getAllNotes, updateNote, deleteNote };
