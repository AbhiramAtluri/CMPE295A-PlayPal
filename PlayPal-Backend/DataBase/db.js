const mysql = require("mysql2");
const conn = mysql.createPool({
  host: "playpal.mysql.database.azure.com",
  database: "PlayPal",
  user: "playpal",
  password: "BiryaniBois@1008",
  port: 3306,
  connectionLimit: 10,
  multipleStatements: true,
});

conn.on("connection", (connection) => {
  console.log("Connected ");
});

module.exports = conn.promise();
