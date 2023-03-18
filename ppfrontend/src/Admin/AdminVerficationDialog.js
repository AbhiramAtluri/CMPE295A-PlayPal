import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import UserProfile from "./UserProfile";
import VenueDetails from "./VenueDetails";
import { useDispatch } from "react-redux";
import {
  getAllVerificationRequests,
  resetSelected,
  saveProfileStatus,
  saveVenueStatus,
} from "../reduxSlices/VerificationSlice";
export default function AdminVerficationDialog(props) {
  const [id, setid] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setid(props.id);
  }, [props.id]);
  console.log(props.type);
  const handleClose = (status) => {
    // If status is not null then dispatch save else just close the dialog
    if (status != null && status != undefined) {
      if (props.type == "venue") {
        dispatch(saveVenueStatus(status));
      } else if (props.type == "coach") {
        dispatch(saveProfileStatus(status));
      }
    } else {
      dispatch(resetSelected());
    }
    setid("");
    props.closeDialog();
  };

  return (
    <div>
      <Dialog
        open={props.openDialog}
        onClose={() => handleClose()}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="scroll-dialog-title">Profile Details</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            {/* <UserProfile></UserProfile> */}
            {props.type == "venue" ? <VenueDetails></VenueDetails> : ""}
            {props.type == "coach" ? <UserProfile></UserProfile> : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("rejected")}>Reject</Button>
          <Button onClick={() => handleClose("approved")} color={"success"}>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
