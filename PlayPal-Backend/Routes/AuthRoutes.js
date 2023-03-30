var express = require("express");
var pool = require("../DataBase/db");
var router = express.Router();
var queries = require("../DataBase/queries.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/user/registeration", async (req, res) => {
  console.log(req.body);
  let {
    firstname,
    lastname,
    mobile,
    email,
    password,
    city,
    type,
    username,
    sports,
  } = req.body;
  let [interest1, interest2, interest3] = [...sports];
  console.log(
    "hi" + firstname,
    lastname,
    mobile,
    email,
    password,
    city,
    type,
    username,
    sports
  );
  console.log(interest1, interest2, interest3);
  try {
    let usercheck = await pool.query(queries.checkuser, [email]);
    if (usercheck[0].length > 0) {
      res.status(403).send("User Exists");
    } else {
      let result = await pool.query(queries.addNewUser, [
        firstname,
        lastname,
        mobile,
        email,
        password,
        city,
        type,
        interest1,
        interest2,
        interest3,
      ]);
      res.status(200).send("Success");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/venueOwner/registration", async (req, res, next) => {
  try {
    let { firstname, lastname, mobile, email, password, city, username, dob } =
      req.body;
    dob = new Date(dob).toLocaleDateString();
    let hashPass = await bcrypt.hash(password, saltRounds);
    let usercheck = await pool.query(queries.checkuser, [email]);
    if (usercheck[0].length > 0) {
      res.status(403).send("User Exists");
    } else {
      let result = await pool.query(queries.saveVenueOwner, [
        firstname,
        lastname,
        email,
        hashPass,
        username,
        mobile,
        dob,
        city,
        "venueowner",
      ]);
      res.status(200).send({ message: "sucess", info: result[0] });
    }
  } catch (err) {
    next(err);
  }
});
router.post("/user/login", async (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;

  try {
    let authuser = await pool.query(queries.authuser, [
      email,
      password,
      "user",
    ]);
    if (authuser[0].length > 0) {
      let details = { ...authuser[0][0] };
      delete details.password;
      res.status(200).send({ status: "Authenticated", details: details });
    } else {
      res.status(401).send("Unauthorized User");
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/venueOwner/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let authuser = await pool.query(queries.authVenueOwner, [
      email,
      "venueowner",
    ]);
    if (authuser[0].length > 0) {
      let details = { ...authuser[0][0] };
      let authorized = await bcrypt.compare(password, details.password);
      if (authorized) {
        console.log("authorized");
        delete details.password;
        res.status(200).send({ status: "Authenticated", details: details });
      } else {
        res.status(401).send("Unauthorized User");
      }
    } else {
      res.status(401).send("Unauthorized User");
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
