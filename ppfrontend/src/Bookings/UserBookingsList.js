import {
  Card,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { height } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import { getAllBookingsByUserId } from "../reduxSlices/BookingsSlice";
import dayjs from "dayjs";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
export default function UserBookingsList() {
  const dispatch = useDispatch();
  const userId = JSON.parse(sessionStorage.getItem("details"))?.id || 0;
  const bookingsList = useSelector(
    (state) => state.bookings.bookingsListForUserId
  );
  useEffect(() => {
    dispatch(getAllBookingsByUserId(userId));
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <div>
        <NavBar />
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
            {bookingsList.map((booking) => {
              return UserBookingListItem(booking);
            })}
          </List>
        </Card>
      </div>
    </div>
  );
}
function UserBookingListItem(booking) {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
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
          secondary={`${booking.venue.venuename}`}
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
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </React.Fragment>
  );
}
