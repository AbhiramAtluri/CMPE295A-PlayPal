const saveNewBooking =
  "insert into bookings(bookingid,venueid,userid,bookingtimestamp,bookingstatus,paymenttype,price) values(?,?,?,?,?,?,?);";
const saveNewBookingDetails =
  "insert into booking_details(bookingid,timeslotstart,timeslotend,noofcourts) values ?;";
const getAllBookingByUserId =
  "select b.* ,bd.timeslotstart,bd.timeslotend,bd.noofcourts from bookings as b inner join booking_details as bd on b.bookingid=bd.bookingid where b.userid=?;";
const getAllBookingsByVenueIds = `select b.* ,bd.timeslotstart,bd.timeslotend,bd.noofcourts ,
v.venueownerid,v.venuename,v.startTime,v.endTime,v.address,v.type,v.city,v.mobile, v.email,
concat(u.firstname," " ,u.lastname) as userfullname, u.city as usercity,u.photo as userprofilepic,u.mobile as usermobile,u.email as useremail
from bookings as b 
inner join booking_details as bd on b.bookingid=bd.bookingid 
inner join venues as v on b.venueid=v.id 
inner join users as u on u.id=b.userid
where b.venueid in (select id from venues where venueownerid=?);`;
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
  getAllBookingsByVenueIds,
};
