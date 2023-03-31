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
    let {
      venuename,
      startTime,
      endTime,
      type,
      address,
      city,
      mobile,
      email,
      amenity1,
      amenity2,
      amenity3,
      noofcourts,
      venueOwnerId,
      urls,
    } = req.body;
    console.log(req.body);
    const verifcationReqDT = new Date().toLocaleDateString();
    startTime = new Date(startTime).toLocaleTimeString();
    endTime = new Date(endTime).toLocaleTimeString();
    const venue = await pool.execute(queries.saveNewVenue, [
      venueOwnerId,
      venuename,
      startTime,
      endTime,
      type,
      address,
      city,
      mobile,
      email,
      amenity1,
      amenity2,
      amenity3,
      noofcourts,
      verifcationReqDT,
    ]);
    const venueId = venue[0].insertId;
    let values = [];
    urls.forEach((url) => {
      values.push([venueId, url]);
    });
    if (values.length > 0) {
      const result = await pool.query(queries.saveVenueImages, [values]);
    }
    res.send({ venueId });
  } catch (err) {
    next(err);
  }
}
async function handelGetAllVenuesForOwnerId(req, res, next) {
  try {
    const id = req.params.id;
    if (id == undefined || null)
      res.staus(402).send({ message: "Bad Request" });
    let result = await pool.execute(queries.getAllVenuesForOwnerId, [id]);
    res.send({ venues: result[0] });
  } catch (err) {
    next(err);
  }
}
async function handleGetVenueDetailsById(req, res, next) {
  try {
    const id = req.params.id;
    if (id == undefined || null)
      res.staus(402).send({ message: "Bad Request" });
    let result = await pool.execute(queries.getVenueDetailsById, [id]);
    const venue = result[0];
    res.send({ venue: venue });
  } catch (err) {
    next(err);
  }
}
async function handleSaveImagesByVenueId(req, res, next) {
  try {
    const venueId = req.params.venueId;

    let { urls } = req.body;
    let values = [];
    urls.forEach((url) => {
      values.push([venueId, url]);
    });

    const result = await pool.query(queries.saveVenueImages, [values]);
    res.send(result[0]);
  } catch (err) {
    next(err);
  }
}
async function handleUpdateVenueById(req, res, next) {
  try {
    let {
      id,
      venuename,
      startTime,
      endTime,
      type,
      address,
      city,
      mobile,
      email,
      amenity1,
      amenity2,
      amenity3,
      noofcourts,
    } = req.body;
    startTime = new Date(startTime).toLocaleTimeString();
    endTime = new Date(endTime).toLocaleTimeString();
    const result = await pool.execute(queries.updateVenueById, [
      venuename,
      startTime,
      endTime,
      address,
      type,
      city,
      mobile,
      email,
      amenity1,
      amenity2,
      amenity3,
      noofcourts,
      id,
    ]);
    res.send(result[0]);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  handleGetAllApprovedVenues,
  handleSaveNewVenue,
  handelGetAllVenuesForOwnerId,
  handleGetVenueDetailsById,
  handleSaveImagesByVenueId,
  handleUpdateVenueById,
};
