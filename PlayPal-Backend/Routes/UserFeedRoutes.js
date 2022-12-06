var express = require('express');
var pool = require('../DataBase/db')
var router = express.Router()
var queries = require("../DataBase/queries.js")


router.post("/getfeed",async (req,res)=>{
    let {location} = req.body

    try{
        let getfeed = await pool.query(queries.getFeed,[location])

        if (getfeed[0].length >0){
            res.status(200).send({
                feed:getfeed[0]
            })
        }else{
            res.status(201)
        }
    }catch(err){
        console.log(err)
        res.send(err)
    }

})

module.exports = router