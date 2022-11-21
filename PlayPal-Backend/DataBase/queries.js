 const addNewUser = `insert into users (firstname,lastname,mobile,email,password,city,type) values(?,?,?,?,?,?,?);`
 const checkuser = "select * from users where email =?"
 const authuser =  "select * from users where email =? and password =?"

 module.exports =  {addNewUser,checkuser,authuser}
