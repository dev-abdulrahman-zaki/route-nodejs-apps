import express from "express";
import mongoose from "mongoose";
const app = express();
const port = 4000;
// 00. Middleware
app.use(express.json());

// 01. Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mongoose") // or: mongodb://localhost:27017/mongoose
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// 02. Define the schema
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// 03. Define the model
const User = mongoose.model("User", userSchema);

// 04. Create a new user
app.post(`/users`, async (req, res) => {
  // todo: insertMany VS new instance of model VS create
  const user = await User.insertMany({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  res.json({ message: "success", user });
});

// 05. Get all users
app.get(`/users`, async (req, res) => {
  // todo: find VS findOne VS findById
  const users = await User.find({});
  res.json({ message: "success", users });
});

// 06 Delete a user
app.delete(`/users/:id`, async (req, res) => {
  // todo: findByIdAndDelete VS findOneAndDelete
  const user = await User.findByIdAndDelete(req.params.id);
  res.json({ message: "success", user });
});

// 07 Update a user
app.put(`/users/:id`, async (req, res) => {
  // todo: findByIdAndUpdate VS findOneAndUpdate VS findOneAndReplace
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // return the updated document
  });
  res.json({ message: "success", user });
});

// Start the server
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
