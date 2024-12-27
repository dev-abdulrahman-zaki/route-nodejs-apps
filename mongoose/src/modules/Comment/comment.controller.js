import { Comment } from "../../../database/models/comment.model.js";

const addComment = async (req, res) => {
  const comment = await Comment.insertMany(req.body); // req.body is the data sent by the client
  res.status(201).json({ message: "success", comment });
};

const getAllComments = async (req, res) => {
  const comments = await Comment.find().populate("createdBy post");
  /*
  or: .populate("createdBy", "name email -password").populate("post", "title")
  */
  res.status(200).json({ message: "success", comments });
};

/*
  - to exclude a field from Comment itself not from the populated data:
    // Alternative 1: Using .select() method
    Comment.find({}).select("-__v")

    // Alternative 2: Using string projection as second argument
    Comment.find({}, "-__v")

    // Alternative 3: Using object projection as second argument
    Comment.find({}, { __v: 0 })
*/

export { addComment, getAllComments };
