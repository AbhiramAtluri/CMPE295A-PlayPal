const saveNewBooking =
  "insert into bookings(bookingid,venueid,userid,bookingtimestamp,bookingstatus,paymenttype,price) values(?,?,?,?,?,?,?);";
const saveNewBookingDetails =
  "insert into booking_details(bookingid,timeslotstart,timeslotend,noofcourts) values ?;";
const getAllBookingByUserId =
  "select b.* ,bd.timeslotstart,bd.timeslotend,bd.noofcourts from bookings as b inner join booking_details as bd on b.bookingid=bd.bookingid where b.userid=?;";
module.exports = {
  saveNewBooking,
  saveNewBookingDetails,
  getAllBookingByUserId,
};
