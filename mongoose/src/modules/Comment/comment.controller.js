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
    // Alternative 1: Using string/object projection in .select() method
    Comment.find({}).select("-__v") or Comment.find({}).select({__v: 0})

    // Alternative 2: Using string/object projection as second argument of find() method without using .select() method
    Comment.find({}, "-__v") or Comment.find({}, { __v: 0 })    
*/

export { addComment, getAllComments };
