 const addNewUser = `insert into users (firstname,lastname,mobile,email,password,city,type,interests1,interests2,interests3) values(?,?,?,?,?,?,?,?,?,?);`
 const checkuser = "select * from users where email =?"
 const authuser =  "select * from users where email =? and password =?"
 const getFeed = "select * from post where location =?"
 const addPost = "insert into post (posttype,location,postedbyid,posttext,postedname) values(?,?,?,?,?);"

 module.exports =  {addNewUser,checkuser,authuser,getFeed,addPost}
