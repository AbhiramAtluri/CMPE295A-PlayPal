import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPersonalDetials } from "./reduxSlices/PersonalDetailsSlice";
import { saveVenueOwner } from "./reduxSlices/PersonalDetailsSlice";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const validationSchema = yup.object({
  firstname: yup.string("Enter First name").required("First Name is Required"),
  lastname: yup.string("Enter Last name").required("Last Name is Required"),
  uname: yup.string("Enter User name").required("User Name is Required"),
  mobile: yup
    .string("Enter mobile number")
    .required("mobile number is Required"),
  city: yup.string("Enter city name").required("City is Required"),
  state: yup.string("Enter State").required("State is Required"),
  zipcode: yup.string("Enter Zipcode").required("Zipcode is Required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  dob: yup.date("Select DOB").required("DOB is required"),
});
export default function PersonaDetailsForm(props) {
  const formIntialValues = useSelector((state) => state.personalDetails);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstname: formIntialValues.firstname,
      lastname: formIntialValues.lastname,
      email: formIntialValues.email,
      password: formIntialValues.password,
      uname: formIntialValues.uname,
      mobile: formIntialValues.mobile,
      dob: formIntialValues.dob,
      city: formIntialValues.city,
      state: formIntialValues.state,
      zipcode: formIntialValues.zipcode,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(setPersonalDetials(values));
      if (props.type == "venueOwner") {
        console.log("inside submit");
        dispatch(saveVenueOwner());
      } else {
        props.handleNext();
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
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
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
          />
          <TextField
            id="lname"
            label="Last Name"
            variant="outlined"
            style={{ padding: 10, width: "50%" }}
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
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
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            style={{ padding: 10, width: "50%" }}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
            name="uname"
            value={formik.values.uname}
            onChange={formik.handleChange}
            error={formik.touched.uname && Boolean(formik.errors.uname)}
            helperText={formik.touched.uname && formik.errors.uname}
          />
          <TextField
            id="mobile"
            label="Mobile Number"
            variant="outlined"
            style={{ padding: 10, width: "50%" }}
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
          <DesktopDatePicker
            // onChange={formik.handleChange}
            onChange={(value) => formik.setFieldValue("dob", value, true)}
            value={formik.values.dob}
            renderInput={(params) => (
              <TextField
                {...params}
                style={{ padding: 10, width: "50%" }}
                error={formik.touched.dob && Boolean(formik.errors.dob)}
                helperText={formik.touched.dob && formik.errors.dob}
                name="dob"
                id="dob"
                label="Date Of Birth"
              />
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
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
          <TextField
            id="state"
            label="State"
            variant="outlined"
            style={{ padding: 10, width: "50%" }}
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          />
          <TextField
            id="zipcode"
            label="Zipcode"
            variant="outlined"
            style={{ padding: 10, width: "50%" }}
            name="zipcode"
            value={formik.values.zipcode}
            onChange={formik.handleChange}
            error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
            helperText={formik.touched.zipcode && formik.errors.zipcode}
          />
        </div>
        <div
          className="fifthRow"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "10%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ width: "30%" }}
            // onClick={props.handleNext}
            type="submit"
          >
            Next
          </Button>
        </div>
        <div
          style={{
            // margin: "2%",
            display: "flex",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Typography variant="p" style={{ paddingRight: "0.5%" }}>
            Already a Member?{" "}
          </Typography>
          <Link
            to={props.type == "venueOwner" ? "/venueOwner/login" : "/UserLogin"}
          >
            {" "}
            Sign In,here!
          </Link>
        </div>
      </form>
    </div>
  );
}
