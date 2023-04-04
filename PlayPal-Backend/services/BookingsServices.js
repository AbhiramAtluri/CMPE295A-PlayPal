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
    // let map_ = await groupByBookings(bookings);
    // console.log(map_);
    // res.send(map_);
    res.send(
      _.groupBy(bookings[0], "bookingid")
      // .map((x) =>
      //   _.mergeWith({}, ...x, (obj, src) =>
      //     _.isArray(obj) ? obj.concat(src) : undefined
      //   )
      // )
      // .value()
    );
  } catch (err) {
    next(err);
  }
}
module.exports = { handleSaveNewBooking, handleGetAllBookingByUserId };

async function groupByBookings(bookings) {
  let map_ = new Map();
  for (let i = 0; i < (await bookings[0].length); i++) {
    let current = await bookings[0][i];
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
    if (map_.has(current.id)) {
      map_.get(current.id).slots.push({ timeslotstart, timeslotend });
    } else {
      newObj = {
        bookingid,
        venueid,
        userid,
        bookingtimestamp,
        bookingstatus,
        paymenttype,
        price,
        noofcourts,
      };
      newObj.slots = [];
      newObj.slots.push({ timeslotstart, timeslotend });
      map_.set(bookingid, newObj);
    }
  }
  return map_.values();
}
