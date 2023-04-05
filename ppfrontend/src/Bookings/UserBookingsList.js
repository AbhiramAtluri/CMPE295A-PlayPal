import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
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
              // return UserBookingListItem(booking);
              return <UserBookingListItem booking={booking} />;
            })}
          </List>
        </Card>
      </div>
    </div>
  );
}
function UserBookingListItem(props) {
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
            <ListItem
              sx={{
                marginLeft: "5%",
                width: "100%",
              }}
            >
              <Grid container>
                <Grid item xl={10} md={10}>
                  <Card sx={{ display: "flex" }} elevation={5}>
                    <CardHeader
                      sx={{ width: "50%" }}
                      title={`${booking.venue.venuename}`}
                      subheader={`${booking.venue.address}, ${booking.venue.city}`}
                    />
                    <CardMedia
                      component={"img"}
                      width="200"
                      // height={"200"}
                      image={booking.venue.url[0].url}
                    ></CardMedia>
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
            style={{ flexBasis: "70%", margin: "1%" }}
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
