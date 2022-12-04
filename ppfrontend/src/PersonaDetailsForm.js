import React from "react";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
export default function PersonaDetailsForm() {
  return (
    <div>
      <div
        className="firstRow"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TextField
          id="fname"
          label="First Name"
          variant="outlined"
          style={{ padding: 10, width: "50%" }}
        />
        <TextField
          id="lname"
          label="Last Name"
          variant="outlined"
          style={{ padding: 10, width: "50%" }}
        />
      </div>
      <div
        className="secondRow"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          style={{ padding: 10, width: "50%" }}
        />
        <TextField
          id="pass"
          label="Password"
          type="password"
          variant="outlined"
          style={{ padding: 10, width: "50%" }}
        />
      </div>
      <div
        className="thirdRow"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TextField
          id="uname"
          label="User Name"
          variant="outlined"
          style={{ padding: 10, width: "50%" }}
        />
        <TextField
          id="mobile"
          label="Mobile Number"
          variant="outlined"
          style={{ padding: 10, width: "50%" }}
        />
        <DesktopDatePicker
          id="dob"
          label="Date Of Birth"
          renderInput={(params) => (
            <TextField {...params} style={{ padding: 10, width: "50%" }} />
          )}
        />
      </div>
      <div
        className="fourtRow"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TextField
          id="city"
          label="City"
          variant="outlined"
          style={{ padding: 10, width: "50%" }}
        />
        <TextField
          id="state"
          label="State"
          variant="outlined"
          style={{ padding: 10, width: "50%" }}
        />
        <TextField
          id="zipcode"
          label="Zipcode"
          variant="outlined"
          style={{ padding: 10, width: "50%" }}
        />
      </div>
    </div>
  );
}
