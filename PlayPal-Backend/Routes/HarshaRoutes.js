var express = require("express");
var router = express.Router();
const {
  handleGetAllTournaments,
  handleSaveNewTournament,
  handleSaveVenueVerificationStatus,
  handleSaveCoachVerificationStatus,
  handleGetCoachVerificationReq,
  handleGetVenueVerificationReq,
} = require("../services/AdminServices");
const {
  handleSaveNewBooking,
  handleGetAllBookingByUserId,
  handleGetAllBookingByVenueOwnerId,
} = require("../services/BookingsServices");
const {
  handeGetAllVenueReviewsByVenueId,
  handleSaveNewVenueReview,
  handleUpdateVenueReviewByReviewId,
  handleDeleteVenueReviewByReviewId,
} = require("../services/VenueReviewsServices");
const {
  handleGetAllApprovedVenues,
  handleSaveNewVenue,
  handelGetAllVenuesForOwnerId,
  handleGetVenueDetailsById,
  handleSaveImagesByVenueId,
  handleUpdateVenueById,
} = require("../services/VenueServices");
/* --------------------Routes by Harsha  ------------------------------*/
/* -------------------- Admin Routes  ------------------------------*/
router.get("/admin/verificationRequests/coach", handleGetCoachVerificationReq);
router.get("/admin/verificationRequests/venue", handleGetVenueVerificationReq);
router.post(
  "/admin/verificationRequests/coach",
  handleSaveCoachVerificationStatus
);
router.post(
  "/admin/verificationRequests/venue",
  handleSaveVenueVerificationStatus
);
router.post("/admin/tournament/new", handleSaveNewTournament);
router.get("/admin/tournaments/all", handleGetAllTournaments);

/* --------------------Venue Routes  ------------------------------*/
router.get("/venues/approved/all", handleGetAllApprovedVenues);
router.post("/venues/new", handleSaveNewVenue);
router.get("/venueOwner/:id/venues/all", handelGetAllVenuesForOwnerId);
router.get("/venues/:id", handleGetVenueDetailsById);
router.post("/venues/images/:venueId", handleSaveImagesByVenueId);
router.put("/venues/", handleUpdateVenueById);
/*------------------- Venue Review Routes -----------------------*/
router.get("/venue/reviews/:venueId", handeGetAllVenueReviewsByVenueId);
router.post("/venue/review", handleSaveNewVenueReview);
router.put("/venue/review", handleUpdateVenueReviewByReviewId);
router.delete("/venue/review/:reviewId", handleDeleteVenueReviewByReviewId);
/*------------------Bookings Routes-------------------------- */
router.post("/booking", handleSaveNewBooking);
router.get("/bookings/:userId", handleGetAllBookingByUserId);
router.get(
  "/bookings/venueowner/:venueOwnerId",
  handleGetAllBookingByVenueOwnerId
);
module.exports = router;
