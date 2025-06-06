import { User } from "../../database/models/user.model.js";
import { catchError } from "../../middlewares/error/catchError.middleware.js";
import { SystemError } from "../../utils/systemError.js";
import { deleteOne, getAll } from "../../utils/factoryHandlers.js";

const addUser = catchError(async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ message: "success", user });
});

const getAllUsers = getAll(User, ["name", "email"]);

const getSingleUser = catchError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new SystemError("User not found", 404));
  }
  res.status(200).json({ message: "success", user });
});

const updateUser = catchError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    return next(new SystemError("User not found", 404));
  }
  res.status(200).json({ message: "success", user });
});

const deleteUser = deleteOne(User);

export { addUser, getAllUsers, getSingleUser, updateUser, deleteUser };
