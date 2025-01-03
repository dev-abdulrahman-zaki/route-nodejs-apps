import express from "express";
import multer from "multer";
import { uploadPhoto, uploadPhotos, getPhotos } from "./photo.controller.js";

const photoRoutes = express.Router();
const upload = multer({
  dest: "uploads/",
});
photoRoutes.post(`/upload-single`, upload.single("photo"), uploadPhoto);
photoRoutes.post(`/upload-multiple`, upload.array("photos"), uploadPhotos);
photoRoutes.get(`/`, getPhotos);

export default photoRoutes;
