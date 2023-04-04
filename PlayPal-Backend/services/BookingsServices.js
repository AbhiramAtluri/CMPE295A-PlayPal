var queries = require("../DataBase/bookingsQueries");
var pool = require("../DataBase/db");
const dayjs = require("dayjs");
const { v4: uuidv4 } = require("uuid");
async function handleSaveNewBooking(req, res, next) {
  let conn = await pool.getConnection();
  try {
    let { venueId, userId, slots, price, noofcourts, bookingTime } = req.body;
    let bookingId = uuidv4().toString();
    let bookingStatus = "accepted";
    let paymentType = "online";
    //Convert Dates to String

    bookingTime = dayjs(bookingTime).format();
    console.log(bookingId, bookingTime);
    await conn.beginTransaction();
    await conn.query(queries.saveNewBooking, [
      bookingId,
      venueId,
      userId,
      bookingTime,
      bookingStatus,
      paymentType,
      price,
    ]);
    let values = [];
    for (let slot of slots) {
      slot[0] = dayjs(slot[0]).format();
      slot[1] = dayjs(slot[1]).format();
      console.log(slot[0], slot[1]);
      values.push([bookingId, slot[0], slot[1], noofcourts]);
    }
    await conn.query(queries.saveNewBookingDetails, [values]);
    await conn.commit();
  } catch (error) {
    await conn.rollback();
    next(error);
  }
}
module.exports = { handleSaveNewBooking };
