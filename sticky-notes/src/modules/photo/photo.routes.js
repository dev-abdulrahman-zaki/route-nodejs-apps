import express from "express";
import { uploadPhoto, uploadPhotos, getPhotos } from "./photo.controller.js";
import fileUpload from "../../services/fileUpload/fileUpload.js";

const photoRoutes = express.Router();

photoRoutes.post(`/upload-single`, fileUpload().single("photo"), uploadPhoto); // Note: photo is the name of the file input in the form. (not imgUrl in the schema)
photoRoutes.post(`/upload-multiple`, fileUpload().array("photos", 3), uploadPhotos);
photoRoutes.get(`/`, getPhotos);

export default photoRoutes;
