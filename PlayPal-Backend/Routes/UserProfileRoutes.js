var express = require('express');
var pool = require('../DataBase/db')
var router = express.Router()
var queries = require("../DataBase/queries.js")
const userModel = require('../MongoModels/usersModel')


router.post("/getProfile", async (req, res) => {

    let {email} = req.body
        
    try {
        console.log(email)
        let data = await pool.query(queries.checkuser, [email])
        res.send(data[0][0]).status(200)
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
})

module.exports = router