const express = require("express");
const cors = require("cors");
const knex = require("knex");
const authController = require("./controllers/authController");
const imageController = require("./controllers/imageController");
const userController = require("./controllers/userController");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "",
    password: "",
    database: "face-detection",
  },
});

const app = express();

//--Middleware--//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//--Middleware--//

app.get("/", (req, res) => {
  res.status(200).json("Welcome to our server.");
});

app.get("/profile/:id", (req, res) => {
  res.status(200);
});

app.post("/register", (req, res) => authController.registerUser(req, res, db));

app.post("/signin", (req, res) => authController.signInUser(req, res, db));

app.post("/image", imageController.postImage);

app.put("/user/entry", (req, res) => userController.addUserEntry(req, res, db));

app.listen(3001, () => console.log("Up and running on Port: 3001..."));
