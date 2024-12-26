import { User } from "../../../database/models/user.model.js";

// 04. Create a new user
const addUser = async (req, res) => {
  // todo: insertMany VS new instance of model VS create
  const user = await User.insertMany({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  res.json({ message: "success", user });
};

// 05. Get all users
const getAllUsers = async (req, res) => {
  // todo: find VS findOne VS findById
  const users = await User.find({});
  res.json({ message: "success", users });
};

// 06 Delete a user
const deleteUser = async (req, res) => {
  // todo: findByIdAndDelete VS findOneAndDelete
  const user = await User.findByIdAndDelete(req.params.id);
  res.json({ message: "success", user });
};

// 07 Update a user
const updateUser = async (req, res) => {
  // todo: findByIdAndUpdate VS findOneAndUpdate VS findOneAndReplace
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // return the updated document
  });
  res.json({ message: "success", user });
};

export { addUser, getAllUsers, deleteUser, updateUser };
