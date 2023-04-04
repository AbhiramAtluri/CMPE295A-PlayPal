const saveNewBooking =
  "insert into bookings(bookingid,venueid,userid,bookingtimestamp,bookingstatus,paymenttype,price) values(?,?,?,?,?,?,?);";
const saveNewBookingDetails =
  "insert into booking_details(bookingid,timeslotstart,timeslotend,noofcourts) values ?;";
module.exports = { saveNewBooking, saveNewBookingDetails };
