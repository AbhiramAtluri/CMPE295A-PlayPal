var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser')
var os = require('os');
const mysql = require("mysql2")
// const util = require("./src/util")

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(8080,function(){
    console.log("Server listening on" + 8080)
})
app.get('/', function (req, res) {
    res.send('Welcome to PlayPal Backend ');
});