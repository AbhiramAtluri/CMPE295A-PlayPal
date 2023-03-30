import React from "react";

import coverImg from "../cover_image_sports.jpg";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import PersonaDetailsForm from "../PersonaDetailsForm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";
import { resetPersonalDetails } from "../reduxSlices/PersonalDetailsSlice";
import { useNavigate } from "react-router-dom";

export default function VenueOwnerRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currState = useSelector((state) => state.personalDetails);
  const handleClose = () => {
    if (currState.venueOwnerRegistrationIsSucess == true)
      navigate("/venueOwner/login");
    dispatch(resetPersonalDetails());
  };
  return (
    <div className="main">
      <div className="left">
        <img src={"./images/logo.png"} className="logo"></img>
        <img src={coverImg} className="coverImg"></img>
        <div>
          <Typography variant="h6" className="byline">
            Join the Winning Team: List Your Venue and Get Discovered by Sports
            Enthusiasts Everywhere!
          </Typography>
          <Typography variant="h6" className="byline">
            Score Big with Us: Maximize Your Venue's Potential and Grow Your
            Business in the World of Sports!
          </Typography>
          <Typography variant="h6" className="byline">
            Host Tournaments
          </Typography>
        </div>
      </div>
      <div className="right">
        <div>
          <Typography variant="h2" component={"h2"} className="title">
            Join Us
          </Typography>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <PersonaDetailsForm type={"venueOwner"} />
        </LocalizationProvider>
      </div>
      <Dialog
        open={currState.venueOwnerRegistrationIsDone}
        onClose={handleClose}
      >
        <DialogTitle>
          {currState.venueOwnerRegistrationIsDone &&
          currState.venueOwnerRegistrationIsSucess
            ? "Sucess"
            : "Failed"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>{"Okay"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
