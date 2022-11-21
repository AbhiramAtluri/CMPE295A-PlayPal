var express = require('express');
var pool = require('../DataBase/db')
var router = express.Router()
var queries = require("../DataBase/queries.js")
// const bcrypt = require("bcrypt.js")

router.post('/user/registeration', async (req,res)=>{

     let {firstname,lastname,mobile,email,password,city,type} = req.body

     try{
        let usercheck = await pool.query(queries.checkuser,[email])     
         if (usercheck[0].length >0){
            res.status(403).send("User Exists")
         }else{
            let result = await pool.query(queries.addNewUser,[firstname,lastname,mobile,email,password,city,type])
            res.status(200).send("Success")
         }
     }
     catch(err){
        console.log(err)
}}
)

router.post('/user/login',async (req,res)=>{
    let {email,password} = req.body

    try{
        let authuser = await pool.query(queries.authuser,[email,password])
        if (authuser[0].length >0){
            res.status(200).send("Authenticated")
        }else{
            res.status(401).send("Unauthorized User")
        }

    }catch(err){
      console.log(err)
    }

})

module.exports = router