import { User } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../services/emails/sendEmails.js";

const signup = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.insertMany({ ...req.body, password: hashedPassword });
  sendEmail(req.body.email);
  user[0].password = undefined; // to hide the password from the response
  return res.status(201).json({ message: "success", user: user[0] }); //insertMany returns an array of the inserted documents, so we need to access the first element of the array.
};

const signin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }); // object or null
  const isPasswordCorrect =
    user && (await bcrypt.compare(req.body.password, user.password)); // fix bug: check if user is exist before comparing the password to avoid error user?.password is undefined
  if (!user || !isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid email or password" }); // security best practice: do not reveal the reason for the failure
  }
  user.password = undefined; // to hide the password from the response
  // generate token
  jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" },
    (err, token) => {
      if (err) {
        console.error("JWT Sign Error:", err);
        return res.status(500).json({ message: "Error generating token" });
      }
      return res.status(200).json({ message: "success", token });
    }
  );
};

const verifyEmail = async (req, res) => {
  jwt.verify(req.params.token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token", error: err });
    }
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.confirmEmail = true;
    await user.save();
    return res.status(200).json({ message: "Email verified", email: decoded.email });
  });
};

export { signup, signin, verifyEmail };
