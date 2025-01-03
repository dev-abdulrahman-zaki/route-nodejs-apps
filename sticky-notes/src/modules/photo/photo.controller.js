import { Photo } from "../../../database/models/photo.model.js";
import { catchError } from "../../middlewares/catchError.js";

const uploadPhoto = catchError(async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  const { title } = req.body;
  const file = req.file;
  const imgUrl = file.path;

  const photo = await Photo.create({ title, imgUrl });
  res.status(201).json({ message: "Photo uploaded successfully", photo });
});

const uploadPhotos = catchError(async (req, res, next) => {
  const { title } = req.body;
  const { files } = req;
  const imgUrls = files.map(file => file.path);
  const photos = await Photo.insertMany(imgUrls.map(imgUrl => ({ title, imgUrl })));
  res.status(201).json({ message: "Photos uploaded successfully", photos });
});

const getPhotos = catchError(async (req, res, next) => {  
  const photos = await Photo.find();
  res.status(200).json({ message: "Photos fetched successfully", photos });
});

export { uploadPhoto, uploadPhotos, getPhotos };
