import express from "express";
import multer from "multer";
import { uploadPhoto, uploadPhotos, getPhotos } from "./photo.controller.js";

const photoRoutes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

photoRoutes.post(`/upload-single`, upload.single("photo"), uploadPhoto); // Note: photo is the name of the file input in the form. (not imgUrl in the schema)
photoRoutes.post(`/upload-multiple`, upload.array("photos"), uploadPhotos);
photoRoutes.get(`/`, getPhotos);

export default photoRoutes;
