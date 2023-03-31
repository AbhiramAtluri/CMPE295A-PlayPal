const getAllVenueReviewsByVenueId = `SELECT r.*,u.id as userId,CONCAT(u.firstname,'',u.lastname) as name FROM playpal.venue_reviews as r inner join playpal.users as u on r.fromUserId=u.id where r.toVenueId=?;`;
const saveNewVenueReview =
  "INSERT INTO `playpal`.`venue_reviews` (`toVenueId`, `fromUserId`, `rating`, `reviewText`,`reviewDate`) VALUES (?,?,?,?,?);";
const updateVenueReviewByReviewId =
  "UPDATE `playpal`.`venue_reviews` SET `rating` = ?, `reviewText` = ? WHERE (`reviewId` = ?);";
const deleteVenueReviewByReviewId =
  "DELETE FROM `playpal`.`venue_reviews` WHERE (`reviewId` = ?);";
module.exports = {
  getAllVenueReviewsByVenueId,
  saveNewVenueReview,
  updateVenueReviewByReviewId,
  deleteVenueReviewByReviewId,
};
