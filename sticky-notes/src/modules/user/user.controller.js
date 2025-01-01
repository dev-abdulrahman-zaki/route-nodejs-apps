import { User } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../services/emails/sendEmail.js";
import { catchError } from "../../middlewares/catchError.js";
import { SystemError } from "../../utils/systemError.js";
import Joi from "joi";

// ===== Start Validation Schema ======
const signupValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().lowercase().trim().email().required(),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long - from Joi",
  }),
  // repassword: Joi.string().valid(Joi.ref("password")).required(),
  age: Joi.number().min(18).max(100),
});

const signinValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
// ===== End Validation Schema ======

const signup = catchError(async (req, res, next) => {
  // 01 - validate the request body
  const { error } = signupValidationSchema.validate(req.body, {
    abortEarly: true,
    /*
      abortEarly: true (default) - stops validation on the first error
      abortEarly: false - collects all validation errors
    */
  });
  if (error) {
    // return next(new SystemError(error.message, 400)); // error.message is the error message from Joi - or: err.details
    // return res.status(400).json({ message: error }); // error.message is the error message from Joi - or: err.details
    // return res.status(400).json({ message: error.details }); // error.message is the error message from Joi - or: err.details
    return next(new SystemError(error.details[0].message, 400)); // error.message is the error message from Joi - or: err.details
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.insertMany({ ...req.body, password: hashedPassword });
  sendEmail(req.body.email);
  user[0].password = undefined; // to hide the password from the response
  return res.status(201).json({ message: "success", user: user[0] }); //insertMany returns an array of the inserted documents, so we need to access the first element of the array.
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

export { signup, signin, verifyEmail };
