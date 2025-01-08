import userRoutes from "./src/modules/user/user.routes.js";
import noteRoutes from "./src/modules/note/note.routes.js";
import photoRoutes from "./src/modules/photo/photo.routes.js";
import { checkAuth } from "./src/middlewares/checkAuth.js";

export const indexRoutes = (app) => {
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/auth", userRoutes);
  app.use("/notes", checkAuth, noteRoutes);
  app.use("/photos", photoRoutes);
};
