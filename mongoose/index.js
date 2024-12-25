import express from "express";
import mongoose from "mongoose";
const app = express();
const port = 4000;

mongoose
  .connect("mongodb://127.0.0.1:27017/mongoose")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
