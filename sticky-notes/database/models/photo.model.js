import mongoose from "mongoose";

// 01. Define the schema
const photoSchema = mongoose.Schema({
  title: String,
  imgUrl: String,
});

// 02. Post middleware - runs after the query is executed
// photoSchema.post("find", function (docs, next) {
//   docs.forEach(doc => {
//     doc.imgUrl = `http://localhost:4000/uploads/${doc.imgUrl}`;
//   });
//   next();
// });

photoSchema.post("init", function (doc) {
  doc.imgUrl = `http://localhost:4000/uploads/${doc.imgUrl}`;
});

// 03. Define the model
export const Photo = mongoose.model("Photo", photoSchema); // Photo is the name of the collection in the "localhost:27017/sticky-notes" database, which is "photos" by default.
