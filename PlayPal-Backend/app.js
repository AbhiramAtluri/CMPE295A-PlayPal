var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var os = require("os");
const mysql = require("mysql2");

const authRouter = require("./Routes/AuthRoutes");
const feedRouter = require("./Routes/UserFeedRoutes");
const harshaRouter = require("./Routes/HarshaRoutes");
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(8080, function () {
  console.log("Server listening on" + 8080);
});
app.use("/auth", authRouter);
app.use("/feed", feedRouter);
app.use("/harsha", harshaRouter);
app.get("/", function (req, res) {
  res.send("Welcome to PlayPal Backend ");
});

const errorHandler = (error, request, response, next) => {
  console.error(error);
  response.header("Content-Type", "application/json");
  response.status(500);
  response.send({ error });
};
app.use(errorHandler);
