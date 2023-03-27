var express = require("express");
var pool = require("../DataBase/db");
var router = express.Router();
var queries = require("../DataBase/queries.js");
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
router.get("/venues/approved/all", handleGetAllApprovedVenues);
router.post("/venues/new", handleSaveNewVenue);
/**
 * To get all pending coach verification requests
 * @param {} req
 * @param {*} res
 */
async function handleGetCoachVerificationReq(req, res) {
  const [rows, fields] = await pool.execute(queries.getCoachVerificationReq, [
    "pending",
  ]);
  rows.forEach((row) => (row.verificationType = "coach"));
  res.send(rows);
}
/**
 * Get all venues with pending verification
 * @param {*} req
 * @param {*} res
 */
async function handleGetVenueVerificationReq(req, res) {
  const [rows, fields] = await pool.execute(queries.getVenueVerificationReq, [
    "pending",
  ]);
  rows.forEach((row) => (row.verificationType = "venue"));
  res.send(rows);
}
/**
 * save coach verification status by admin
 * @param {} req
 * @param {*} res
 */
async function handleSaveCoachVerificationStatus(req, res) {
  const { status, id } = req.body;
  let result = await pool.execute(queries.saveCoachVerificationStatus, [
    status,
    id,
  ]);
  res.send(result[0]);
}
/**
 * Save venue verification status made by admin
 * @param {} req
 * @param {*} res
 */
async function handleSaveVenueVerificationStatus(req, res) {
  const { status, id } = req.body;
  let result = await pool.execute(queries.saveVenueVerificationStatus, [
    status,
    id,
  ]);
  res.send(result[0]);
}
/**
 * Save new tournament details from admin
 * @param {} req
 * @param {*} res
 */
async function handleSaveNewTournament(req, res, next) {
  try {
    let {
      tournamentName,
      status,
      startDate,
      endDate,
      venue,
      sport,
      sportType,
      noOfTeams,
      noOfPlayersPerTeam,
      noOfPlayers,
    } = req.body;
    startDate = new Date(startDate).toLocaleDateString();
    endDate = new Date(endDate).toLocaleDateString();
    let result = await pool.execute(queries.saveNewTournament, [
      tournamentName,
      venue,
      startDate,
      endDate,
      status,
      sport,
      sportType,
      noOfTeams,
      noOfPlayersPerTeam,
      noOfPlayers,
    ]);
    res.send(result[0]);
  } catch (error) {
    next(error);
  }
}
async function handleGetAllTournaments(req, res, next) {
  try {
    const result = await pool.execute(queries.getAllTournaments);
    res.send(result[0]);
  } catch (err) {
    next(err);
  }
}
async function handleGetAllApprovedVenues(req, res, next) {
  try {
    const result = await pool.execute(queries.getAllVenues, ["approved"]);
    res.send(result[0]);
  } catch (err) {
    next(err);
  }
}
async function handleSaveNewVenue(req, res, next) {
  try {
    const result = await pool.execute(queries.saveNewVenue, []);
  } catch (err) {
    next(err);
  }
}
module.exports = router;
