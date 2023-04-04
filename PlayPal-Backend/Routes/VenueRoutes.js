var express = require('express');
var pool = require('../DataBase/db')
var router = express.Router()
var queries = require("../DataBase/queries.js")

router.post("/getVenueFeed",async(req,res)=>{
    let {location} = req.body
    console.log(location)
    try{
        let getFeed = await pool.query(queries.getVenuesFeed,[location,"approved"])
        console.log(getFeed)
        res.send(getFeed[0]).status(200)
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})

module.exports = router