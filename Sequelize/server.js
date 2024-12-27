import express from "express";
import { Sequelize, DataTypes } from "sequelize";
const app = express();
const port = 3000;

// Database Connection
const sequelize = new Sequelize({
  database: "sequelize",
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
});
app.use(express.json());

// Test Database Connection
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

// Model - Table - Schema
const UserModel = sequelize.define(
  "user",
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   unique: true,
    //   primaryKey: true,
    //   allowNull: false,
    // },
    name: {
      type: DataTypes.STRING(100),
    },
    email: {
      type: DataTypes.STRING(100),
    },
    password: {
      type: DataTypes.STRING(100),
    },
    age: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

const PostModel = sequelize.define("post", {
  title: {
    type: DataTypes.STRING(100),
  },
  description: {
    type: DataTypes.STRING(100),
  },
  userId: {
    type: DataTypes.INTEGER,
  },
});

// Create Tables
sequelize
  .sync({
    alter: true,
  })
  .then(() => console.log("Table created"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const users = await UserModel.findAll({
    // attributes: ["id", "name", "age"],
    attributes: { exclude: ["password"] },
  });
  res.json({
    message: "success",
    data: users,
  });
});

app.post("/users", async (req, res) => {
  const user = await UserModel.create(req.body);
  res.json({
    message: "success",
    data: user,
  });
});

app.put("/users/:id", async (req, res) => {
  const [result] = await UserModel.update(
    req.body,
    {
      where: {
        id: req.params.id,
      },
    }
  );
  console.log(result);
  res.json({
    message: result === 1 ? "success" : "user not found",
  });
});

app.delete("/users/:id", async (req, res) => {
  const result = await UserModel.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json({
    message: result === 1 ? "success" : "user not found",
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
