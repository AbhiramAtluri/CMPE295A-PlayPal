var queries = require("../DataBase/bookingsQueries");
var pool = require("../DataBase/db");
const dayjs = require("dayjs");
const { v4: uuidv4 } = require("uuid");
var _ = require("lodash");
async function handleSaveNewBooking(req, res, next) {
  let conn = await pool.getConnection();
  try {
    let { venueId, userId, slots, price, noOfCourts, bookingTime } = req.body;
    let bookingId = uuidv4().toString();
    let bookingStatus = "accepted";
    let paymentType = "online";
    //Convert Dates to String

    bookingTime = dayjs(bookingTime).format();
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
      values.push([bookingId, slot[0], slot[1], noOfCourts]);
    }
    await conn.query(queries.saveNewBookingDetails, [values]);
    await conn.commit();
    console.log("Commited");
    let msg = "Booking Success";
    res.send(msg);
  } catch (error) {
    await conn.rollback();
    next(error);
  }
}

async function handleGetAllBookingByUserId(req, res, next) {
  try {
    let bookings = await pool.execute(queries.getAllBookingByUserId, [
      req.params.userId,
    ]);
    let venues;
    let result;
    if (bookings[0].length > 0) {
      let venueIds = _.uniq(_.map(bookings[0], "venueid"));
      venues = await pool.execute(
        queries.getVenuesDetailsForBookingByVenueIds,
        [venueIds]
      );
      result = await groupByBookings(bookings, venues[0]);
      res.send({ bookings: [...result] });
    } else {
      res.send({ bookings: [] });
    }
  } catch (err) {
    next(err);
  }
}
module.exports = { handleSaveNewBooking, handleGetAllBookingByUserId };

async function groupByBookings(bookings, venues) {
  let map_ = new Map();
  for (let i = 0; i < bookings[0].length; i++) {
    let current = bookings[0][i];
    let {
      bookingid,
      venueid,
      userid,
      bookingtimestamp,
      bookingstatus,
      paymenttype,
      price,
      timeslotstart,
      timeslotend,
      noofcourts,
    } = current;
    if (map_.has(current.bookingid)) {
      let obj = map_.get(current.bookingid);
      obj.slots.push({ timeslotstart, timeslotend });
      map_.set(bookingid, obj);
    } else {
      newObj = {
        bookingid,
        userid,
        bookingtimestamp,
        bookingstatus,
        paymenttype,
        price,
        noofcourts,
      };
      newObj.venue = venues.filter((x) => x.id == venueid)[0];
      newObj.slots = [];
      newObj.slots.push({ timeslotstart, timeslotend });

      map_.set(bookingid, newObj);
    }
  }
  return map_.values();
}
