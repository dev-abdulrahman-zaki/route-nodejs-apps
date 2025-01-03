import express from "express";
import multer from "multer";
import { uploadPhoto, uploadPhotos, getPhotos } from "./photo.controller.js";

const photoRoutes = express.Router();
const upload = multer({
  dest: "uploads/",
});
photoRoutes.post(`/upload-single`, upload.single("photo"), uploadPhoto); // Note: photo is the name of the file input in the form. (not imgUrl in the schema)
photoRoutes.post(`/upload-multiple`, upload.array("photos"), uploadPhotos);
photoRoutes.get(`/`, getPhotos);

export default photoRoutes;
