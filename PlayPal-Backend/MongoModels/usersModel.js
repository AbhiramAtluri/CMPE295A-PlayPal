const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
    firstname :{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true
    },
    contacts:{
        type: Array
    }
})

module.exports = mongoose.model("users",usersSchema)