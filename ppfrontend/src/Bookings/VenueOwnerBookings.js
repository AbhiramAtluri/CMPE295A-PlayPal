import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { height } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import {
  getAllBookingsByUserId,
  getAllBookingsByVenueOwnerId,
} from "../reduxSlices/BookingsSlice";
import dayjs from "dayjs";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import VenueNavBar from "../Venues/VenueNavBar";

export default function VenueOwnerBookings() {
  const [filterSelected, setfilterSelected] = useState("All");
  const dispatch = useDispatch();
  const venueOwnerID = useSelector((state) => state.profileDetails.id);
  const bookingsList = useSelector(
    (state) => state.bookings.bookingsListForVenueOwnerId
  );
  const [filteredBookingsList, setfilteredBookingsList] = useState([]);
  const filterOptions = ["All", "Past", "Upcoming"];
  useEffect(() => {
    dispatch(getAllBookingsByVenueOwnerId(venueOwnerID));
  }, []);

  const handleFilterChange = (event) => {
    setfilterSelected(event.target.value);
  };
  useEffect(() => {
    if (filterSelected == "Past") {
      setfilteredBookingsList(
        bookingsList.filter((x) =>
          dayjs(x.slots[0].timeslotstart).isBefore(dayjs())
        )
      );
    } else if (filterSelected == "Upcoming") {
      setfilteredBookingsList(
        bookingsList.filter((x) =>
          dayjs(x.slots[0].timeslotstart).isAfter(dayjs())
        )
      );
    } else if (filterSelected == "Accepted") {
      setfilterSelected(
        bookingsList.filter((x) => x.bookingstatus === "accepted")
      );
    } else if (filterSelected == "Cancelled") {
      setfilterSelected(
        bookingsList.filter((x) => x.bookingstatus === "cancelled")
      );
    } else if (filterSelected == "Latest") {
      setfilterSelected(
        bookingsList.sort((a, b) =>
          dayjs(a.slots[0].timeslotstart).isAfter(
            dayjs(b.slots[0].timeslotstart)
          )
        )
      );
    } else {
      setfilteredBookingsList(bookingsList);
    }
  }, [filterSelected, bookingsList]);

  return (
    <div style={{ height: "100vh" }}>
      <div>
        <VenueNavBar />
      </div>
      <div style={{ marginLeft: "2%", marginTop: "1%" }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Filter</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={filterSelected}
            onChange={handleFilterChange}
            input={<OutlinedInput label="Name" />}
          >
            {filterOptions.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div
        className="bookings-list"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "2%",
        }}
      >
        <Card elevation={10}>
          <List
            sx={{ width: "100%" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="h1" id="nested-list-subheader">
                Booking Details
              </ListSubheader>
            }
          >
            {filteredBookingsList.map((booking) => {
              // return UserBookingListItem(booking);
              return (
                <VenueBookingListItem
                  booking={booking}
                  key={booking.bookingid}
                />
              );
            })}
          </List>
        </Card>
      </div>
    </div>
  );
}
function VenueBookingListItem(props) {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  let { booking } = props;
  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon></ListItemIcon>
        <ListItemText
          primary={`Booking ID`}
          secondary={`${booking.bookingid}`}
        />
        <ListItemText
          primary={`Booking Date`}
          secondary={`${dayjs(booking.bookingtimestamp).format(
            "YYYY-MM-DD hh:mm A"
          )}`}
        />
        <ListItemText
          primary={`Venue`}
          secondaryTypographyProps={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          secondary={`${booking.venuename}`}
        />
        <ListItemText
          primary={`Status`}
          secondary={`${booking.bookingstatus.toUpperCase()}`}
        />
        <ListItemText
          primary={`Booking Amount`}
          secondary={`$${booking.price}`}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItem
              sx={{
                marginLeft: "5%",
                width: "100%",
              }}
            >
              <Grid container>
                <Grid item xl={12} md={12}>
                  <Card sx={{ display: "flex" }} elevation={5}>
                    <CardHeader
                      sx={{ width: "50%" }}
                      title={`${booking.venuename}`}
                      subheader={`${booking.address}, ${booking.city}`}
                    />
                    {/* <CardMedia
                      component={"img"}
                      width="200"
                      height={"300"}
                      image={booking.venue.url[0].url}
                      sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                      // image={`https://bttc.com.au/wp-content/uploads/2022/12/Badminton-Game-Playing-Rules.jpg`}
                    ></CardMedia> */}
                    <CardContent sx={{ width: "100%" }}>
                      <Typography component="div" variant="h5">{`${dayjs(
                        booking.slots[0].timeslotstart
                      ).format("dddd , YYYY MMMM DD")}`}</Typography>
                      <Typography
                        component="div"
                        variant="h6"
                      >{`Courts : ${booking.noofcourts}`}</Typography>
                      <Slots slots={booking.slots}> </Slots>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </ListItem>
          </ListItemButton>
        </List>
      </Collapse>
    </React.Fragment>
  );
}

function Slots(props) {
  let slots = props.slots;
  console.log(slots);
  return (
    <div className="slots" style={{ display: "flex", flexWrap: "wrap" }}>
      {slots.map((x) => {
        return (
          <Card
            style={{ flexBasis: "50%", margin: "1%" }}
            elevation={8}
            key={x.id}
          >
            <CardContent
              style={{
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              }}
            >
              <Typography color={"white"} component="p">
                {`${dayjs(x.timeslotstart).format("hh:mm A")} - ${dayjs(
                  x.timeslotend
                ).format("hh:mm A")}`}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
