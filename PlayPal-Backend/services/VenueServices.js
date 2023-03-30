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
    let venues = result[0];
    // for (let venue of venues) {
    //   venue.url = venue.url.split[","];
    // }
    res.send({ venues: result[0] });
  } catch (err) {
    next(err);
  }
}
module.exports = {
  handleGetAllApprovedVenues,
  handleSaveNewVenue,
  handelGetAllVenuesForOwnerId,
};
