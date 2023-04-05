const saveNewBooking =
  "insert into bookings(bookingid,venueid,userid,bookingtimestamp,bookingstatus,paymenttype,price) values(?,?,?,?,?,?,?);";
const saveNewBookingDetails =
  "insert into booking_details(bookingid,timeslotstart,timeslotend,noofcourts) values ?;";
const getAllBookingByUserId =
  "select b.* ,bd.timeslotstart,bd.timeslotend,bd.noofcourts from bookings as b inner join booking_details as bd on b.bookingid=bd.bookingid where b.userid=?;";

const getVenuesDetailsForBookingByVenueIds = `select venue.*,
JSON_ARRAYAGG(
  JSON_OBJECT(
    'id', images.id,
    'url', images.url
  )
) as url from playpal.venues as venue left join playpal.venueimages as images on venue.id=images.venueid group by venue.id having venue.id in (?);
`;
module.exports = {
  saveNewBooking,
  saveNewBookingDetails,
  getAllBookingByUserId,
  getVenuesDetailsForBookingByVenueIds,
};
