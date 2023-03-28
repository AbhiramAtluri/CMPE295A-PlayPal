const addNewUser = `insert into users (firstname,lastname,mobile,email,password,city,type,interests1,interests2,interests3) values(?,?,?,?,?,?,?,?,?,?);`;
const checkuser = "select * from users where email =?";
const authuser =
  "select * from users where email =? and password =? and type=?";
const getFeed =
  "SELECT post.postid, post.posttype, post.timestamp, post.posttext , post.mediaurl, post.location,post.postedbyid , users.firstname , users.lastname from post  inner join users on post.postedbyid = users.id where location =? order by post.timestamp desc";
const addPost =
  "insert into post (posttype,postedbyid,timestamp,posttext,mediaurl,location) values(?,?,?,?,?,?);";
const getCoachVerificationReq =
  "select * from playpal.users where verificationStatus=?";
const getVenueVerificationReq = `select concat(u.firstname," " ,u.lastname) as venueownername,v.* from playpal.venues as v inner join playpal.users as u on v.venueownerid=u.id where v.verificationStatus=?`;
const saveCoachVerificationStatus =
  "update playpal.users set verificationStatus=? where id=? ";
const saveVenueVerificationStatus =
  "update playpal.venues set verificationStatus=? where id=?";
const saveNewTournament =
  "insert into playpal.tournaments (tournamentname,venueid,startdate,enddate,status,sport,sporttype,noofteams,noofplayersperteam,noofplayers) values(?,?,?,?,?,?,?,?,?,?)";
const getAllTournaments = "SELECT * FROM playpal.tournaments;";
const getAllVenues = "select * from venues where verificationStatus=?;";
const saveNewVenue =
  "INSERT INTO playpal.venues ( `venuename`, `type`, `city`, `mobile`, `email`, `amenity1`, `amenity2`, `amenity3`, `amenity4`,`amenity5`,`amenity6`, `noofcourts`,`verifcationReqDT`,) VALUES ( ?,?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?);";
const saveVenueOwner = `insert into users (firstname,lastname,email,password,username,mobile,dob,city,type) values(?,?,?,?,?,?,?,?,?)`;
const authVenueOwner = `select * from users where email=? and type=?`;
const getAllVenuesForOwnerId = `select * from playpal.venues where venueownerid=?;`;
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
  getAllVenues,
  saveNewVenue,
  saveVenueOwner,
  authVenueOwner,
  getAllVenuesForOwnerId,
};
