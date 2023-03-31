var queries = require("../DataBase/venueReviewsQueries");
var pool = require("../DataBase/db");
async function handeGetAllVenueReviewsByVenueId(req, res, next) {
  try {
    const venueId = req.params.venueId;
    const result = await pool.execute(queries.getAllVenueReviewsByVenueId, [
      venueId,
    ]);
    res.send({ reviews: result[0] });
  } catch (err) {
    next(err);
  }
}
async function handleSaveNewVenueReview(req, res, next) {
  try {
    let { toVenueId, fromUserId, rating, reviewText } = req.body;

    let reviewDate = new Date().toLocaleString();
    const result = await pool.execute(queries.saveNewVenueReview, [
      toVenueId,
      fromUserId,
      rating,
      reviewText,
      reviewDate,
    ]);
    res.send(result[0]);
  } catch (error) {
    next(error);
  }
}
async function handleUpdateVenueReviewByReviewId(req, res, next) {
  try {
    let { rating, reviewText, reviewId } = req.body;
    const result = await pool.execute(queries.updateVenueReviewByReviewId, [
      rating,
      reviewText,
      reviewId,
    ]);
    res.send(result[0]);
  } catch (error) {
    next(error);
  }
}
async function handleDeleteVenueReviewByReviewId(req, res, next) {
  try {
    const reviewId = req.params.reviewId;
    const result = await pool.execute(queries.deleteVenueReviewByReviewId, [
      reviewId,
    ]);
  } catch (err) {
    next(err);
  }
}
module.exports = {
  handeGetAllVenueReviewsByVenueId,
  handleSaveNewVenueReview,
  handleUpdateVenueReviewByReviewId,
  handleDeleteVenueReviewByReviewId,
};
