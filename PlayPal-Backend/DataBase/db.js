const mysql = require("mysql2")
const conn = mysql.createConnection(
    {host:"playpal.mysql.database.azure.com",
     database:"PlayPal",
     user:'playpal',
     password:"BiryaniBois@1008",
     port:3306,
     connectionLimit: 10,
     multipleStatements: true
}
)
conn.connect((err)=>{
    if (err)
    {
        return console.log(err)
    }
    console.log("Connected")
 
})

module.exports = conn.promise()