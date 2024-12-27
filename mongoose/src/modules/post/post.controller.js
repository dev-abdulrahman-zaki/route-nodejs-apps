import { Post } from "../../../database/models/post.model.js";

const addPost = async (req, res) => {
  const post = await Post.insertMany(
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
  res.status(201).json({ message: "success", post });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("createdBy"); // populate("createdBy") is used to get the user who created the post.
  /*
  or:
  const posts = await Post.find().populate({
    path: "createdBy",
    select: "name email",
  });

  or:
  populate("createdBy", "name email")

  - to exclude a field from the populated data, use the - sign:
  populate("createdBy", "-password")
  */
  res.status(200).json({ message: "success", posts });
};

export { addPost, getAllPosts };
