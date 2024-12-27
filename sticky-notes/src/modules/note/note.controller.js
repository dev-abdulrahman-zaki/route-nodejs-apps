import { Note } from "../../../database/models/note.model.js";

const addNote = async (req, res) => {
  const note = await Note.insertMany(
    req.body
    /*
or:
{
    title: req.body.title,
    description: req.body.description,
    createdBy: req.body.createdBy,
  }
*/
  ); // req.body is the data sent by the client
  res.status(201).json({ message: "success", note });
};

const getAllNotes = async (req, res) => {
  const notes = await Note.find().populate("user"); // populate("user") is used to get the user who created the note.
  /*
  or:
  const notes = await Note.find().populate({
    path: "createdBy",
    select: "name email",
  });

  or:
  populate("createdBy", "name email")

  - to exclude a field from the populated data, use the - sign:
  populate("createdBy", "-password")
  */
  res.status(200).json({ message: "success", notes });
};

export { addNote, getAllNotes };
