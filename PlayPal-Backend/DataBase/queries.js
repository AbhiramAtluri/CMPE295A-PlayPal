const addNewUser = `insert into users (firstname,lastname,mobile,email,password,city,type,interests1,interests2,interests3) values(?,?,?,?,?,?,?,?,?,?);`;
const checkuser = "select * from users where email =?";
const authuser = "select * from users where email =? and password =?";
const getFeed =
  "SELECT post.postid, post.posttype, post.timestamp, post.posttext , post.mediaurl, post.location,post.postedbyid , users.firstname , users.lastname from post  inner join users on post.postedbyid = users.id where location =? order by post.timestamp desc";
const addPost =
  "insert into post (posttype,postedbyid,timestamp,posttext,mediaurl,location) values(?,?,?,?,?,?);";
const getCoachVerificationReq =
  "select * from playpal.users where verificationStatus=?";
const getVenueVerificationReq =
  "select * from playpal.venues where verificationStatus=?;";
const saveCoachVerificationStatus =
  "update playpal.users set verificationStatus=? where id=? ";
const saveVenueVerificationStatus =
  "update playpal.venues set verificationStatus=? where id=?";
const saveNewTournament =
  "insert into playpal.tournaments (tournamentname,venueid,startdate,enddate,status,sport,sporttype,noofteams,noofplayersperteam,noofplayers) values(?,?,?,?,?,?,?,?,?,?)";
const getAllTournaments = "SELECT * FROM playpal.tournaments;";
module.exports = {
  addNewUser,
  checkuser,
  authuser,
  getFeed,
  addPost,
  getCoachVerificationReq,
  getVenueVerificationReq,
  saveCoachVerificationStatus,
  saveVenueVerificationStatus,
  saveNewTournament,
  getAllTournaments,
};
