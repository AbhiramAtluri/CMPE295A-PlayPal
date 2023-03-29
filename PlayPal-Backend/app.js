var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser')
var os = require('os');
const mysql = require("mysql2")
const mongoose = require("mongoose");
const authRouter = require("./Routes/AuthRoutes")
const feedRouter = require("./Routes/UserFeedRoutes")
const chatRouter = require("./Routes/ChatRoutes")
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();
const socket = require("socket.io");

const http = require('http').Server(app);
mongoose.connect("mongodb+srv://playpalmaster:Feb2023@playpalcluster.5xeblyw.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Mongo DB Connection Successfull")
})
.catch((err)=>{
    console.log(err.message)
})

var server = http.listen(8080,function(){
    console.log("Server listening on" + 8080)
})

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

// http.listen(8080,()=>{console.log("Listening on port 8080")})
app.use("/auth",authRouter)
app.use("/feed",feedRouter)
app.use("/chat",chatRouter)
app.get('/', function (req, res) {
    res.send('Welcome to PlayPal Backend ');
});

