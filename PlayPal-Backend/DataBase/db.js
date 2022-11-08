const mysql = require("mysql2")
const conn = mysql.createPool(
    {host:"playpal.cgufr2o7hllp.us-east-2.rds.amazonaws.com",
     database:"Booking",
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