var queries = require("../DataBase/queries.js");
var pool = require("../DataBase/db");

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
async function handelGetAllVenuesForOwnerId(req, res, next) {
  try {
    const id = req.params.id;
    if (id == undefined || null)
      res.staus(402).send({ message: "Bad Request" });
    let venues = await pool.execute(queries.getAllVenuesForOwnerId, [id]);
    res.send({ venues: venues[0] });
  } catch (err) {
    next(err);
  }
}
module.exports = {
  handleGetAllApprovedVenues,
  handleSaveNewVenue,
  handelGetAllVenuesForOwnerId,
};
