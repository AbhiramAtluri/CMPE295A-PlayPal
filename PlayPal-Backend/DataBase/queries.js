const addNewUser = `insert into users (firstname,lastname,mobile,email,password,city,type,interests1,interests2,interests3) values(?,?,?,?,?,?,?,?,?,?);`;
const checkuser = "select * from users where email =?";
const authuser = "select * from users where email =? and password =?";
const getFeed =
  "SELECT post.postid, post.posttype, post.timestamp, post.posttext , post.mediaurl, post.location,post.postedbyid , users.firstname , users.lastname, users.email from post  inner join users on post.postedbyid = users.id where location =? order by post.timestamp desc";
const addPost =
  "insert into post (posttype,postedbyid,timestamp,posttext,mediaurl,location,email) values(?,?,?,?,?,?,?);";
const getEmail = "select email from users where id =?";
const updateProfile =
  "update playpal.users set firstname=?,lastname=?,mobile=?,city=?,interests1=?,interests2=?,interests3=?,photo=?,dob=? where id=?";
const getUserReviews =
  "select user_reviews.reviewText,user_reviews.toUserId,user_reviews.fromUserId,user_reviews.rating,user_reviews.reviewDate , users.firstname, users.lastname from user_reviews inner join users on user_reviews.fromUserId = users.id where toUserId =?";
const addUserReview =
  "insert into user_reviews (toUserId,fromUserId,rating,reviewText,reviewDate) values(?,?,?,?,?);";
const getVenuesFeed = `select venue.*,
JSON_ARRAYAGG(
  JSON_OBJECT(
    'id', images.id,
    'url', images.url
  )
) as url from playpal.venues as venue inner join playpal.venueimages as images on venue.id=images.venueid group by venue.id having venue.city=? and venue.verificationStatus = ?;`;

const getCoachVerificationReq =
  "select * from playpal.users where verificationStatus=?";
const getVenueVerificationReq = `select concat(u.firstname," " ,u.lastname) as venueownername,v.* ,JSON_ARRAYAGG(
  JSON_OBJECT(
    'id', vi.id,
    'url', vi.url
  )
) as url
from playpal.venues as v inner join playpal.users as u on v.venueownerid=u.id left join venueimages as vi on vi.venueid=v.id
group by v.id having v.verificationStatus="pending";`;
const saveCoachVerificationStatus =
  "update playpal.users set verificationStatus=? where id=? ";
const saveVenueVerificationStatus =
  "update playpal.venues set verificationStatus=? where id=?";
const saveNewTournament =
  "insert into playpal.tournaments (tournamentname,venueid,startdate,enddate,status,sport,sporttype,noofteams,noofplayersperteam,noofplayers) values(?,?,?,?,?,?,?,?,?,?)";
const getAllTournaments = "SELECT * FROM playpal.tournaments;";
const getAllVenues = "select * from venues where verificationStatus=?;";
const saveNewVenue =
  "INSERT INTO playpal.venues ( `venueownerid`,`venuename`, `startTime`,`endTime`,`type`,`address`, `city`, `mobile`, `email`, `amenity1`, `amenity2`, `amenity3`, `noofcourts`,`verifcationReqDT`,`pricePerHour`) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
const saveVenueOwner = `insert into users (firstname,lastname,email,password,username,mobile,dob,city,type) values(?,?,?,?,?,?,?,?,?)`;
const authVenueOwner = `select * from users where email=? and type=?`;
const getAllVenuesForOwnerId = `select venue.*,JSON_ARRAYAGG(
  JSON_OBJECT(
    'id', images.id,
    'url', images.url
  )
) as url from playpal.venues as venue left join playpal.venueimages as images on venue.id=images.venueid group by venue.id having venue.venueownerid=?;`;
const saveVenueImages = `insert into playpal.venueimages (venueId,url) values ?`;
const getVenueDetailsById = `select venue.*,
JSON_ARRAYAGG(
  JSON_OBJECT(
    'id', images.id,
    'url', images.url
  )
) as url from playpal.venues as venue left join playpal.venueimages as images on venue.id=images.venueid group by venue.id having venue.id=?;`;
const updateVenueById =
  "UPDATE `playpal`.`venues` SET `venuename` = ?, `startTime` = ?, `endTime` = ?, `address` = ?, `type` = ?, `city` = ?, `mobile` = ?, `email` = ?, `amenity1` = ?, `amenity2` = ?, `amenity3` = ?, `noofcourts` = ? ,`pricePerHour`= ? WHERE (`id` = ?);";
const getTournamentDetails = `select * from tournaments inner join venues on venues.id=tournaments.venueid where tournamentid=?`;
module.exports = {
  addNewUser,
  checkuser,
  authuser,
  getFeed,
  addPost,
  getEmail,
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
  saveVenueImages,
  updateProfile,
  getVenueDetailsById,
  addUserReview,
  getUserReviews,
  getVenuesFeed,
  updateVenueById,
  getTournamentDetails,
};
