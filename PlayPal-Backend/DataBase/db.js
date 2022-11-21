const mysql = require("mysql2")
const conn = mysql.createConnection(
    {host:"playpal.cnv2o0hbq0pm.us-east-2.rds.amazonaws.com",
     database:"PlayPal",
     user:'admin',
     password:"dodgeram",
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