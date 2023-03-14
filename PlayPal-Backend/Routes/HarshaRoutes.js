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

async function handleGetCoachVerificationReq(req, res) {
  const [rows, fields] = await pool.execute(queries.getCoachVerificationReq, [
    "pending",
  ]);
  res.send(rows);
}
async function handleGetVenueVerificationReq(req, res) {
  const [rows, fields] = await pool.execute(queries.getVenueVerificationReq, [
    "pending",
  ]);
  res.send(rows);
}

async function handleSaveCoachVerificationStatus(req, res) {
  const { status, id } = req.body;
  let result = await pool.execute(queries.saveCoachVerificationStatus, [
    status,
    id,
  ]);
  res.send(result[0]);
}

async function handleSaveVenueVerificationStatus(req, res) {
  const { status, id } = req.body;
  let result = await pool.execute(queries.saveVenueVerificationStatus, [
    status,
    id,
  ]);
  res.send(result[0]);
}
module.exports = router;
