 const addNewUser = `insert into users (firstname,lastname,mobile,email,password,city,type,interests1,interests2,interests3) values(?,?,?,?,?,?,?,?,?,?);`
 const checkuser = "select * from users where email =?"
 const authuser =  "select * from users where email =? and password =?"
 const getFeed = "SELECT post.postid, post.posttype, post.timestamp, post.posttext , post.mediaurl, post.location,post.postedbyid , users.firstname , users.lastname from post  inner join users on post.postedbyid = users.id where location =? order by post.timestamp desc"
 const addPost = "insert into post (posttype,postedbyid,timestamp,posttext,mediaurl,location) values(?,?,?,?,?,?);"
 const getEmail = "select email from users where id =?"
 

 module.exports =  {addNewUser,checkuser,authuser,getFeed,addPost,getEmail}
