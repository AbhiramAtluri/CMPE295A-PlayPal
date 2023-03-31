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
  handleGetAllApprovedVenues,
  handleSaveNewVenue,
  handelGetAllVenuesForOwnerId,
  handleGetVenueDetailsById,
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
module.exports = router;
