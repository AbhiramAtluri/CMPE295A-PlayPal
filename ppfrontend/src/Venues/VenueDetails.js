import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  ImageList,
  ImageListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVenueDetailsById } from "../reduxSlices/VenueSlice";
import NewVenue from "./NewVenue";
import VenueNavBar from "./VenueNavBar";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SportsBaseballOutlinedIcon from "@mui/icons-material/SportsBaseballOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import CleanHandsOutlinedIcon from "@mui/icons-material/CleanHandsOutlined";
import UploadImages from "../utils/UploadImages";
import CloseIcon from "@mui/icons-material/Close";

export default function VenueDetails(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const venue = useSelector((state) => state.venues.venueDetailsById);
  const [mode, setmode] = useState("view");

  useEffect(() => {
    dispatch(getVenueDetailsById(params.venueId));
  }, [params.venueId]);
  const handleModeChange = () => {
    if (mode == "edit") setmode("view");
    else setmode("edit");
  };
  return (
    <div>
      <div>
        <VenueNavBar />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4">{venue.venuename?.toUpperCase()}</Typography>
      </div>

      <div className="main-container" style={{ display: "flex" }}>
        <div
          className="images"
          style={{
            display: "flex",
            flex: 2,
            flexDirection: "column",
            margin: "1%",
            justifyContent: "center",
          }}
        >
          <ImageComp venue={venue} userType={props.userType} />
        </div>
        <div
          className="details"
          style={{
            display: "flex",
            flex: 5,
            flexDirection: "column",
          }}
        >
          <Button
            sx={{ display: "flex", alignSelf: "flex-end", marginRight: "1%" }}
            onClick={handleModeChange}
          >
            {mode == "edit" ? "Cancel" : "Edit"}
          </Button>
          {mode == "edit" ? <NewVenue type="edit" /> : <Vdetails />}
        </div>
      </div>
    </div>
  );
}

function Vdetails() {
  const venue = useSelector((state) => state.venues.venueDetailsById);
  return (
    <div>
      <div style={styles.details}>
        <div style={styles.row}>
          <BadgeOutlinedIcon />
          <label style={styles.labels}>VENUE NAME</label>
          <Typography sx={{ paddingLeft: "3%" }}>
            {venue.venuename.toUpperCase()}
          </Typography>
        </div>
        <div style={styles.row}>
          <SportsBaseballOutlinedIcon />
          <label style={styles.labels}>VENUE TYPE</label>
          <Typography sx={{ paddingLeft: "3%" }}>
            {venue.type.toUpperCase()}
          </Typography>
        </div>
        <div style={styles.row}>
          <AccessTimeOutlinedIcon />
          <label style={styles.labels}>VENUE OPERATIONAL HOURS</label>
          <Typography sx={{ paddingLeft: "3%" }}>
            {`${venue.startTime}-${venue.endTime}`}
          </Typography>
        </div>
        <div style={styles.row}>
          <LocationOnOutlinedIcon />
          <label style={styles.labels}>VENUE ADDRESS</label>
          <Typography sx={{ paddingLeft: "3%" }}>
            {venue.address.toUpperCase()}
          </Typography>
        </div>
        <div style={styles.row}>
          <LocationOnOutlinedIcon />
          <label style={styles.labels}>VENUE CITY</label>
          <Typography sx={{ paddingLeft: "3%" }}>
            {venue.city.toUpperCase()}
          </Typography>
        </div>
        <div style={styles.row}>
          <ProductionQuantityLimitsOutlinedIcon />
          <label style={styles.labels}>COURTS</label>
          <Typography sx={{ paddingLeft: "3%" }}>{venue.noofcourts}</Typography>
        </div>
        <div style={styles.row}>
          <PhoneOutlinedIcon />
          <label style={styles.labels}>VENUE MOBILE</label>
          <Typography sx={{ paddingLeft: "3%" }}>{venue.mobile}</Typography>
        </div>
        <div style={styles.row}>
          <EmailOutlinedIcon />
          <label style={styles.labels}>VENUE EMAIL</label>
          <Typography sx={{ paddingLeft: "3%" }}>
            {venue.email.toUpperCase()}
          </Typography>
        </div>
        <div style={styles.row}>
          <AutorenewOutlinedIcon />
          <label style={styles.labels}>STATUS</label>
          <Typography sx={{ paddingLeft: "3%" }}>
            {venue.verificationStatus.toUpperCase()}
          </Typography>
        </div>
        <div style={styles.row}>
          <CleanHandsOutlinedIcon />
          <label style={styles.labels}>AMENITIES</label>
          <Typography sx={{ paddingLeft: "3%" }}>
            {"Parking, Changing Room, Shower Room, Lockers, Equipment for Rent".toUpperCase()}
            ,
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
  details: {
    display: "flex",
    flexDirection: "column",
    flex: 3,
    margin: "3%",
  },
  row: { display: "flex", flexDirection: "row", margin: "0.5%" },
  labels: {
    display: "inlineBlock",
    width: "200px",
    textAlign: "left",
    fontWeight: "bold",
    marginLeft: "0.5%",
    // fontSize: "15px",
  },
};

export function ImageComp(props) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const handleDialogClose = () => {
    setOpen(false);
  };
  const handleImages = (images) => {
    if (images.length > 0) 
    // dispatch();
  };
  return (
    <React.Fragment>
      <div
        style={{
          border: "groove",
          margin: "2%",
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <ImageList
          cols={3}
          rowHeight={200}
          sx={{ width: 500, height: 450, margin: "1%" }}
          variant="quilted"
        >
          {props.venue.url.map((item) => (
            <ImageListItem
              key={item.id}
              onClick={() => {
                setOpen(true);
                setImage(item);
              }}
            >
              console.log(item)
              <img
                // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                src={`${item.url}`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Dialog open={open} onClose={handleDialogClose} fullScreen={true}>
          <DialogContent>
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleDialogClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Image
                </Typography>
              </Toolbar>
            </AppBar>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                flex: 1,
                height: "100%",
              }}
            >
              <img src={image?.url} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {props.userType == "user" ? (
          ""
        ) : (
          <UploadImages setImages={handleImages} />
        )}
      </div>
    </React.Fragment>
  );
}
