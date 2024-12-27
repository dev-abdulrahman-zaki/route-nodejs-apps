import { User } from "../../database/models/user.model.js";

const isUserExist = async (req, res, next) => {
  const isUserExist = await User.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (isUserExist) {
    return res.status(409).json({ message: "User already exists" });
  }
  next();
};

export { isUserExist };
