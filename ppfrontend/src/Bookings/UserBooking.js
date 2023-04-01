import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../NavBar";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
export default function UserBooking() {
  const venue = useSelector((state) => state.venues.venueDetailsById);
  const [noOfCourts, setnoOfCourts] = useState(0);
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 2 }}>
        <NavBar />
      </div>
      <div
        className="main-container"
        style={{
          border: "solid",
          display: "flex",
          justifyContent: "center",
          //   alignItems: "center",
          alignContent: "center",
          flexDirection: "column",
          flex: 50,
        }}
      >
        <Card sx={{ width: 1000, alignSelf: "center" }} elevation={10}>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              style={{ marginBottom: "3%" }}
            >
              BOOKING
            </Typography>
            <div style={styles.details}>
              <div style={styles.row}>
                <labels style={styles.labels}>VENUE NAME</labels>
                <Typography sx={{ paddingLeft: "3%", textAlign: "left" }}>
                  {venue.venuename?.toUpperCase()}
                </Typography>
              </div>
              <div style={styles.row}>
                <label style={styles.labels}>VENUE ADDRESS</label>
                <Typography sx={{ paddingLeft: "3%", textAlign: "left" }}>
                  {venue.address.toUpperCase()}
                </Typography>
              </div>
              <div style={styles.row}>
                <label
                  style={{
                    display: "inlineBlock",
                    width: "250px",
                    textAlign: "right",
                    fontWeight: "bold",
                    paddingTop: "1%",
                  }}
                >
                  Select No Of Courts
                </label>
                <div
                  style={{
                    paddingLeft: "3%",
                    flexDirection: "row",
                    display: "flex",
                  }}
                >
                  <IconButton
                    onClick={() =>
                      noOfCourts > 0 ? setnoOfCourts(noOfCourts - 1) : ""
                    }
                  >
                    <RemoveCircleOutlineOutlinedIcon fontSize="medium" />
                  </IconButton>
                  <Typography padding={"10%"}>{noOfCourts}</Typography>
                  <IconButton
                    onClick={() =>
                      noOfCourts == venue.noofcourts
                        ? ""
                        : setnoOfCourts(noOfCourts + 1)
                    }
                  >
                    <ControlPointOutlinedIcon fontSize="medium" />
                  </IconButton>
                </div>
              </div>
            </div>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </div>
    </div>
  );
}
const styles = {
  details: {
    display: "flex",
    flexDirection: "column",
    flex: 3,
    marginLeft: "20%",
  },
  row: { display: "flex", flexDirection: "row" },
  labels: {
    display: "inlineBlock",
    width: "250px",
    textAlign: "right",
    fontWeight: "bold",
  },
};
