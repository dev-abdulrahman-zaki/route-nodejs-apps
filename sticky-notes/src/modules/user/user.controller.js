import { User } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.insertMany({ ...req.body, password: hashedPassword });
  user[0].password = undefined; // to hide the password from the response
  res.status(201).json({ message: "success", user: user[0] }); //insertMany returns an array of the inserted documents, so we need to access the first element of the array.
};

const signin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }
  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid password" });
  }
  res.status(200).json({ message: "success", user });
};

export { signup, signin };