var express = require('express');
var pool = require('../DataBase/db')
var router = express.Router()
var queries = require("../DataBase/queries.js")

router.post("/getfeed", async (req, res) => {
    let { location } = req.body
    try {
        let getfeed = await pool.query(queries.getFeed, [location])

        if (getfeed[0].length > 0) {
            res.status(200).send({
                feed: getfeed[0]
            })
        } else {
            res.status(201)
        }
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.post("/createPost", async (req, res) => {

    let { posttype, postedbyid, posttext, mediaurl, location, email } = req.body
    let timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
        console.log(posttype, postedbyid, posttext, mediaurl, location,email)
        await pool.query(queries.addPost, [posttype, postedbyid, timestamp, posttext, mediaurl, location, email])
        res.status(200).
            send("Success")
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
})

module.exports = router