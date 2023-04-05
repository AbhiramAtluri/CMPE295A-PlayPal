import { IconButton, Slide, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
export default function VenueDetails(props) {
  const [imageList, setimageList] = useState([]);
  const [index, setindex] = useState(0);
  const [next, setnext] = useState(false);
  const [previous, setprevious] = useState(false);
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState("down");
  const dispatch = useDispatch();
  const venue = useSelector((store) => store.verificationDetails.selected);
  // const [venue, setvenue] = useState();
  useEffect(() => {
    if (venue.url != null || undefined) {
      console.log(venue.url?.filter((x) => x.id != null).map((x) => x.url));
      setimageList(venue.url?.filter((x) => x.id != null).map((x) => x.url));
    } else setimageList([]);
  }, [venue]);

  useEffect(() => {
    console.log(imageList);
    if (index < imageList.length - 1) setnext(true);
  }, [imageList]);

  const handleNext = () => {
    setSlideIn(false);
    if (index < imageList.length - 1) {
      setTimeout(() => {
        setindex(index + 1);
        setprevious(true);
        setSlideDirection("left");
        setSlideIn(true);
      }, 500);
    } else {
      setSlideIn(true);
      setnext(false);
    }
  };
  const handlePrev = () => {
    setSlideIn(false);
    if (index > 0) {
      setTimeout(() => {
        setnext(true);
        setindex(index - 1);
        setSlideDirection("right");
        setSlideIn(true);
      }, 500);
    } else {
      setSlideIn(true);
      setprevious(false);
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.images}>
        <IconButton onClick={handlePrev} disabled={!previous}>
          <KeyboardArrowLeftIcon
            fontSize="large"
            sx={{ color: "red" }}
          ></KeyboardArrowLeftIcon>
        </IconButton>
        <Slide direction={slideDirection} in={slideIn}>
          <div>
            <Box
              component="img"
              sx={{
                height: 350,
                width: 450,
              }}
              alt="No Images to Preview"
              src={imageList[index]}
            />
          </div>
        </Slide>
        <IconButton onClick={handleNext} disabled={!next}>
          <KeyboardArrowRightIcon
            fontSize="large"
            sx={{ color: "red" }}
          ></KeyboardArrowRightIcon>
        </IconButton>
      </div>
      <div style={styles.details}>
        <div style={styles.row}>
          <label style={styles.labels}>Venue Name</label>
          <Typography sx={{ paddingLeft: "3%" }}>{venue.venuename}</Typography>
        </div>
        <div style={styles.row}>
          <label style={styles.labels}>Venue Owner</label>
          <Typography sx={{ paddingLeft: "3%" }}>
            {venue.venueownername}
          </Typography>
        </div>
        <div style={styles.row}>
          <label style={styles.labels}>Venue Type</label>
          <Typography sx={{ paddingLeft: "3%" }}>{venue.type}</Typography>
        </div>
        <div style={styles.row}>
          <label style={styles.labels}>Venue City</label>
          <Typography sx={{ paddingLeft: "3%" }}>{venue.city}</Typography>
        </div>
        <div style={styles.row}>
          <label style={styles.labels}>Venue Mobile</label>
          <Typography sx={{ paddingLeft: "3%" }}>{venue.mobile}</Typography>
        </div>
        <div style={styles.row}>
          <label style={styles.labels}>Venue Email</label>
          <Typography sx={{ paddingLeft: "3%" }}>{venue.email}</Typography>
        </div>
        <div style={styles.row}>
          <label style={styles.labels}>Amenities</label>
          <Typography sx={{ paddingLeft: "3%" }}>
            Parking, Changing Room, Shower Room, Lockers, Equipment for Rent,
          </Typography>
        </div>
      </div>
    </div>
  );
}
const styles = {
  container: {},
  images: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  details: { display: "flex", flexDirection: "column", flex: 3, margin: "3%" },
  row: { display: "flex", flexDirection: "row" },
  labels: { display: "inlineBlock", width: "140px", textAlign: "right" },
};
