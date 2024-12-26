import express from "express";
import { dbConnection } from "./database/dbConnection.js"; // Import the dbConnection to connect to MongoDB even if the dbConnection is not used in the code.
import userRoutes from "./src/modules/user/user.routes.js";
const app = express();
const port = 4000;
// 00. Middleware
app.use(express.json());

// 01. Define the base path
// **Router Setup** is where you establish the base path for a group of routes. This happens in your main `index.js` file:
// This tells Express that any route starting with /users should be handled by the userRoutes router.
app.use("/users", userRoutes);

// Start the server
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
