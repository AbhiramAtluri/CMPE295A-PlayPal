import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VenueNavBar from "./VenueNavBar";
import * as yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  resetNewVenueStatus,
  saveVenueImages,
  updateVenueDetailsByid,
} from "../reduxSlices/VenueSlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import UploadImages from "../utils/UploadImages";
const validationSchema = yup.object({});
export default function NewVenue(props) {
  const dispatch = useDispatch();
  const [images, setimages] = useState([]);
  const navigate = useNavigate();
  const success = useSelector((state) => state.venues.isSaveNewVenueSuccess);
  const fail = useSelector((state) => state.venues.isSaveNewVenueFailed);
  const venue = useSelector((state) => state.venues.venueDetailsById);
  const sportTypes = [
    "Badminton",
    "Cricket",
    "BaseBall",
    "Soccer",
    "Table Tennis",
    "Tennis",
    "American FootBall",
    "Billiards",
  ];
  const amenities = ["Parking", "Equipment", "Lockers", "Shower", "Bevarages"];

  const formik = useFormik({
    initialValues: {
      images: [],
      venuename: "",
      startTime: "",
      endTime: "",
      type: "",
      pricePerHour: 0,
      address: "",
      city: "",
      mobile: "",
      email: "",
      amenity1: "",
      amenity2: "",
      amenity3: "",
      noofcourts: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (props.type == "edit") {
        console.log("Updating venue", values);
        values.id = venue.id;
        dispatch(updateVenueDetailsByid(values));
        props?.onModeChange();
      } else {
        console.log(values);
        values.mode = "new";
        dispatch(saveVenueImages(values));
      }
    },
  });

  const handleImages = (images) => {
    formik.setFieldValue("images", images);
    setimages(images);
  };

  useEffect(() => {
    if (props.type == "edit") {
      formik.setFieldValue("venuename", venue.venuename);
      formik.setFieldValue("startTime", dayjs(venue.startTime, "h:mm:ss A"));
      formik.setFieldValue("endTime", dayjs(venue.endTime, "h:mm:ss A"));
      formik.setFieldValue("type", venue.type);
      formik.setFieldValue("pricePerHour", venue.pricePerHour);
      formik.setFieldValue("address", venue.address);
      formik.setFieldValue("city", venue.city);
      formik.setFieldValue("email", venue.email);
      formik.setFieldValue("amenity1", venue.amenity1);
      formik.setFieldValue("amenity2", venue.amenity2);
      formik.setFieldValue("amenity3", venue.amenity3);
      formik.setFieldValue("noofcourts", venue.noofcourts);
    }
  }, [props.type, venue]);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      {props.type != "edit" ? (
        <div>
          <VenueNavBar />
        </div>
      ) : (
        ""
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {props.type != "edit" ? (
          <Typography variant="h4">Add a New Venue</Typography>
        ) : (
          ""
        )}
      </div>

      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onSubmit={formik.handleSubmit}
        >
          {props.type != "edit" ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                margin: "2%",
                width: "100%",
              }}
            >
              <UploadImages setImages={handleImages} />
              {images.map((image) => (
                <p variant="a" style={{ color: "blue" }}>
                  {image.name}
                </p>
              ))}
            </div>
          ) : (
            ""
          )}

          {/* {Form} */}
          <TextField
            id="vname"
            label="Venue Name"
            style={{
              marginRight: "2%",
              marginLeft: "2%",
              width: "80%",
            }}
            name="venuename"
            value={formik.values.venuename}
            onChange={formik.handleChange}
            error={formik.touched.venuename && Boolean(formik.errors.venuename)}
            helperText={formik.touched.venuename && formik.errors.venuename}
          ></TextField>

          {/* start and end date */}
          <div
            className="start-end-dates"
            style={{
              display: "flex",
              flex: 1,
              width: "80%",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                // onChange={formik.handleChange}
                onChange={(value) =>
                  formik.setFieldValue("startTime", value, true)
                }
                value={formik.values.startTime}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{
                      marginTop: "2%",
                      width: "100%",
                    }}
                    error={
                      formik.touched.startTime &&
                      Boolean(formik.errors.startTime)
                    }
                    helperText={
                      formik.touched.startTime && formik.errors.startTime
                    }
                    name="startTime"
                    id="sd"
                    label="Start Time"
                  />
                )}
              />
              <TimePicker
                // onChange={formik.handleChange}
                onChange={(value) =>
                  formik.setFieldValue("endTime", value, true)
                }
                value={formik.values.endTime}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{
                      marginTop: "2%",
                      marginLeft: "1%",
                      width: "100%",
                    }}
                    error={
                      formik.touched.endTime && Boolean(formik.errors.endTime)
                    }
                    helperText={formik.touched.endTime && formik.errors.endTime}
                    name="endTime"
                    id="sd"
                    label="End Time"
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              width: "80%",
            }}
          >
            <FormControl
              fullWidth={true}
              style={{
                marginTop: "2%",
                marginRight: "2%",

                width: "80%",
              }}
            >
              <InputLabel id="type-id">Sport Type</InputLabel>
              <Select
                id="type"
                label="Sport Type"
                labelId="type-id"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              >
                {sportTypes.map((type, index) => {
                  return (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl
              style={{
                marginTop: "2%",
                marginLeft: "2%",
                width: "80%",
              }}
            >
              <InputLabel htmlFor="outlined-adornment-amount">
                Price per Hour
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Price Per Hour"
                type="number"
                name="pricePerHour"
                value={formik.values.pricePerHour}
                onChange={formik.handleChange}
                error={
                  formik.touched.pricePerHour &&
                  Boolean(formik.errors.pricePerHour)
                }
                helperText={
                  formik.touched.pricePerHour && formik.errors.pricePerHour
                }
              ></OutlinedInput>
            </FormControl>
          </div>
          <TextField
            id="address"
            label="Address"
            style={{
              marginTop: "2%",
              marginRight: "2%",
              marginLeft: "2%",
              width: "80%",
            }}
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          ></TextField>
          <div
            style={{
              display: "flex",
              flex: 1,
              width: "80%",
            }}
          >
            <TextField
              id="city"
              label="City"
              style={{
                marginTop: "2%",
                marginRight: "2%",
                width: "50%",
              }}
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            ></TextField>

            <TextField
              id="mobile"
              label="Mobile"
              style={{
                marginTop: "2%",
                marginLeft: "2%",
                width: "60%",
              }}
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            ></TextField>

            <TextField
              id="email"
              label="Email"
              style={{
                marginTop: "2%",

                marginLeft: "2%",
                width: "80%",
              }}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            ></TextField>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              width: "80%",
            }}
          >
            <FormControl
              fullWidth={true}
              style={{
                marginTop: "2%",
                marginRight: "2%",
                width: "80%",
              }}
            >
              <InputLabel id="type-id">Amenity 1</InputLabel>
              <Select
                id="amenity1"
                label="Amenity 1"
                labelId="amenity1-id"
                name="amenity1"
                value={formik.values.amenity1}
                onChange={formik.handleChange}
                error={
                  formik.touched.amenity1 && Boolean(formik.errors.amenity1)
                }
                helperText={formik.touched.amenity1 && formik.errors.amenity1}
              >
                {amenities.map((x, index) => {
                  return (
                    <MenuItem key={index} value={x}>
                      {x}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl
              fullWidth={true}
              style={{
                marginTop: "2%",
                width: "80%",
              }}
            >
              <InputLabel id="type-id">Amenity 2</InputLabel>
              <Select
                id="amenity1"
                label="Amenity 2"
                labelId="amenity1-id"
                name="amenity2"
                value={formik.values.amenity2}
                onChange={formik.handleChange}
                error={
                  formik.touched.amenity2 && Boolean(formik.errors.amenity2)
                }
                helperText={formik.touched.amenity2 && formik.errors.amenity2}
              >
                {amenities.map((x, index) => {
                  return (
                    <MenuItem key={index} value={x}>
                      {x}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl
              fullWidth={true}
              style={{
                marginTop: "2%",
                marginLeft: "2%",
                width: "80%",
              }}
            >
              <InputLabel id="type-id">Amenity 3</InputLabel>
              <Select
                id="amenity3"
                label="Amenity 3"
                labelId="amenity3-id"
                name="amenity3"
                value={formik.values.amenity3}
                onChange={formik.handleChange}
                error={
                  formik.touched.amenity3 && Boolean(formik.errors.amenity3)
                }
                helperText={formik.touched.amenity3 && formik.errors.amenity3}
              >
                {amenities.map((x, index) => {
                  return (
                    <MenuItem key={index} value={x}>
                      {x}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              id="noofcourts"
              label="No Of Courts"
              style={{
                marginTop: "2%",

                marginLeft: "2%",
                width: "80%",
              }}
              type="number"
              name="noofcourts"
              value={formik.values.noofcourts}
              onChange={formik.handleChange}
              error={
                formik.touched.noofcourts && Boolean(formik.errors.noofcourts)
              }
              helperText={formik.touched.noofcourts && formik.errors.noofcourts}
            ></TextField>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "2%",
              marginRight: "2%",
              marginLeft: "2%",
              width: "30%",
              justifyContent: "space-evenly",
            }}
          >
            <Button type="reset"> Reset</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
      <Dialog
        open={success || fail}
        onClose={() => dispatch(resetNewVenueStatus())}
      >
        <DialogTitle>{success ? "Sucess" : "Failed"}</DialogTitle>
        <DialogContent>
          {success
            ? "Sucessfully created a venue. Once Admin approves it, players can view your venue "
            : "Oops something went wrong please try again later"}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (success) navigate("/venueOwner/venue/lists");
              dispatch(resetNewVenueStatus());
            }}
          >
            {" "}
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
