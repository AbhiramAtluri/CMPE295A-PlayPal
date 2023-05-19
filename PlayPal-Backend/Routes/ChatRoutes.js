var express = require('express');
var pool = require('../DataBase/db')
var router = express.Router()
var queries = require("../DataBase/queries.js")
const userModel = require('../MongoModels/usersModel')
const messageModel = require('../MongoModels/messageModel')


router.post('/getcontactschat', async (req, res) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
})

router.post('/getAllContacts', async (req, res) => {
  console.log("hi")
  try {
    let { email } = req.body
    let users = await userModel.find({ email: email }).select("contacts")
    console.log(users)
    // res.json({contacts:users[0].contacts}).status(200)
    let contacts = users[0].contacts
    let result = []

    for (var i = 0; i < contacts.length; i++) {
      let details = await userModel.find({ email: contacts[i] })
      result.push(details[0])
    }
    res.send({ "contacts": result }).status(200)
  }
  catch (err) {
    console.log(err)
  }
})

router.post('/addContact', async (req, res) => {
  try {
    let { email, contactemail } = req.body
    console.log(email, contactemail)
     if(email == contactemail){
      throw new Error
     }
     userModel.findOne({ email: email }).then((data)=>{
      if(data.contacts.includes(contactemail)){
        throw new Error("Duplicate")
      }
     }).then((data)=>{
      console.log("h")
      return userModel.findOneAndUpdate(
        { email: email },
        { $push: { contacts: contactemail } },
      )
     }).then((data)=>{
      console.log("S")
      return userModel.findOneAndUpdate(
        { email: contactemail },
        { $push: { contacts: email } })
    }).then((data)=>{
      res.send("OK").status(200)
    }).catch((err)=>{
      res.send("Duplicate").status(403)
    })
  } catch (err) {
    res.send("sameemail")
  }
})
router.post('/getEmail', async (req, res) => {

  try {

    const { id } = req.body
    console.log(id)
    let result = await pool.query(queries.getEmail, [id])
    let email = result[0][0].email
    res.json({ email: email })
  }
  catch (err) {
    console.log(err)
  }
})
router.post('/addmessage', async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
})

module.exports = router