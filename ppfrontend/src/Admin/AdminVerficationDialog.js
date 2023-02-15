import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import UserProfile from "./UserProfile";
import VenueDetails from "./VenueDetails";
export default function AdminVerficationDialog(props) {
  const [id, setid] = useState("");
  useEffect(() => {
    setid(props.id);
  }, [props.id]);
  console.log(props.type);
  const handleClose = () => {
    props.closeDialog();
    setid("");
    console.log("closing");
  };

  return (
    <div>
      <Dialog
        open={props.openDialog}
        onClose={handleClose}
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
            {props.type == "Venue" ? <VenueDetails></VenueDetails> : ""}
            {props.type == "Coach" ? <UserProfile></UserProfile> : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Reject</Button>
          <Button onClick={handleClose} color={"success"}>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
