import { User } from "../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { sendEmail } from "../../services/emails/sendEmail.js";
import { catchError } from "../../middlewares/error/catchError.middleware.js";
import { SystemError } from "../../utils/systemError.js";

const signup = catchError(async (req, res) => {
  const user = new User(req.body);
  await user.save();
  // generate token in signup to redirect the user to Homepage after signing up without signing in again. (UX)
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET
  );
  // await sendEmail(
  //   req.body.email,
  //   "Verify your email",
  //   "Click here to verify your email"
  // );
  user.password = undefined; // to hide the password from the response
  return res.status(201).json({ message: "success", user, token });
});

const signin = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }); // object or null
  const isPasswordCorrect =
    user && (await bcrypt.compare(req.body.password, user.password)); // fix bug: check if user is exist before comparing the password to avoid error user?.password is undefined
  if (!user || !isPasswordCorrect) {
    return next(new SystemError("Invalid email or password", 401)); // security best practice: do not reveal the reason for the failure
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
        return next(new SystemError("Error generating token", 500));
      }
      return res.status(200).json({ message: "success", token });
    }
  );
});

const verifyEmail = catchError(async (req, res, next) => {
  jwt.verify(req.params.token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return next(new SystemError("Invalid token", 401));
    }
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return next(new SystemError("User not found", 404));
    }
    user.confirmEmail = true;
    await user.save();
    return res
      .status(200)
      .json({ message: "Email verified", email: decoded.email });
  });
});

const changePassword = catchError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const isPasswordCorrect =
    user && (await bcrypt.compare(req.body.password, user.password));
  if (!user || !isPasswordCorrect) {
    return next(new SystemError("Invalid email or password", 401));
  }
  user.password = req.body.newPassword;
  user.passwordChangedAt = new Date();
  await user.save();
  jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    // { expiresIn: "8h" },
    (err, token) => {
      if (err) {
        console.error("JWT Sign Error:", err);
        return next(new SystemError("Error generating token", 500));
      }
      return res.status(200).json({ message: "Password changed", token });
    }
  );
});

// const forgotPassword = catchError(async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });
//   user.password = req.body.password;
//   await user.save();
//   return res.status(200).json({ message: "Password changed" });
// });

export { signup, signin, verifyEmail, changePassword };
