import express from "express";
import mysql from "mysql2";
const app = express();
const port = 3000;
app.use(express.json());
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_test",
});

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  conn.execute(
    `insert into users (name, email, password) values ('${name}', '${email}', '${password}')`
  );
  res.status(201).json({
    message: "success",
  });
});

app.put("/users/:id", (req, res) => {
  const { name, email, password } = req.body;
  conn.execute(`update users set name='${name}' where id=${req.params.id}`);
  res.status(200).json({
    message: "success",
  });
});

app.delete("/users/:id", (req, res) => {
  conn.execute(`delete from users where id=${req.params.id}`);
  res.status(200).json({
    message: "success",
  });
});

app.get("/users", (req, res) => {
  conn.execute(`select * from users`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        message: "success",
        data: result,
      });
    }
  });
});

app.get("/users/:id", (req, res) => {
  conn.execute(`select * from users where id=${req.params.id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        message: "success",
        data: result,
      });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
