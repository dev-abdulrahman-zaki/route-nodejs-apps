import userRoutes from "./user/user.routes.js";
import noteRoutes from "./note/note.routes.js";
import photoRoutes from "./photo/photo.routes.js";
import { checkAuth } from "../middlewares/checkAuth.js";

export const indexRoutes = (app) => {
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/auth", userRoutes);
  app.use("/notes", checkAuth, noteRoutes);
  app.use("/photos", photoRoutes);
};
