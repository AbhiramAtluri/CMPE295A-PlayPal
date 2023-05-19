import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import AdminNavBar from "../AdminNavBar";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAdminTournamentStatus,
  saveNewTournament,
} from "../../reduxSlices/AdminTournamentslice";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { getAllApprovedVenues } from "../../reduxSlices/VenueSlice";
import dayjs from "dayjs";

const validationSchema = yup.object({
  tournamentName: yup
    .string("Enter Tournament Name")
    .required("This is a required Field"),
  startDate: yup.date().required("This is a required Field"),
  endDate: yup.date().required("This is a required Field"),
  sport: yup.string("Sport is Required").required("This is a required Field"),
  sportType: yup
    .string("Sport Type is required")
    .required("This is a required Field"),
});
export default function NewTournament(props) {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.adminTournament);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const formIntialValues = useSelector((state) => state.personalDetails);
  const approvedVenues = useSelector(
    (state) => state.venues.approvedVenuesList
  );
  const tournamentDetails = useSelector(
    (state) => state.adminTournament.tournamentDetails
  );
  const handleClose = () => {
    setOpen(false);
    dispatch(resetAdminTournamentStatus());
  };
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
  const formik = useFormik({
    initialValues: {
      tournamentName: "",
      status: "",
      venue: "",
      startDate: "",
      endDate: "",
      sport: "",
      sportType: "",
      noOfTeams: 0,
      noOfPlayersPerTeam: 0,
      noOfPlayers: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(saveNewTournament(values));
    },
  });
  useEffect(() => {
    if (status.isDone || status.isError) {
      setOpen(true);
    }
  }, [status.isDone, status.isError]);
  useEffect(() => {
    dispatch(getAllApprovedVenues());
  }, []);
  useEffect(() => {
    if (props.mode === "edit") {
      console.log("mode changed to edit");
      formik.setFieldValue("tournamentName", tournamentDetails.tournamentname);
      formik.setFieldValue("startDate", dayjs(tournamentDetails.startdate));
      formik.setFieldValue("endDate", dayjs(tournamentDetails.enddate));
      formik.setFieldValue("venue", tournamentDetails.venueid);
      formik.setFieldValue("sport", tournamentDetails.sport);
      formik.setFieldValue("sportType", tournamentDetails.sporttype);
      formik.setFieldValue("noOfTeams", tournamentDetails.noofteams);
      formik.setFieldValue(
        "noOfPlayersPerTeam",
        tournamentDetails.noofplayersperteam
      );
      formik.setFieldValue("noOfPlayers", tournamentDetails.noofplayers);
      // formik.setFieldValue("amenity2", tournamentDetails.amenity2);
      // formik.setFieldValue("amenity3", tournamentDetails.amenity3);
      // formik.setFieldValue("noofcourts", tournamentDetails.noofcourts);
    }
  }, [props.mode, tournamentDetails]);
  return (
    <div>
      <div>
        <AdminNavBar />
      </div>
      {status.isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border: "solid",
            height: "75vh",
          }}
        >
          <CircularProgress size={80} />
        </div>
      ) : (
        <div className="form" style={{ marginTop: "2%" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              id="tname"
              label="Tournament Name"
              style={{
                marginTop: "2%",
                marginRight: "2%",
                marginLeft: "2%",
                width: "80%",
              }}
              name="tournamentName"
              value={formik.values.tournamentName}
              onChange={formik.handleChange}
              error={
                formik.touched.tournamentName &&
                Boolean(formik.errors.tournamentName)
              }
              helperText={
                formik.touched.tournamentName && formik.errors.tournamentName
              }
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
                <DesktopDatePicker
                  // onChange={formik.handleChange}
                  onChange={(value) =>
                    formik.setFieldValue("startDate", value, true)
                  }
                  value={formik.values.startDate}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{
                        marginTop: "2%",
                        width: "100%",
                      }}
                      error={
                        formik.touched.startDate &&
                        Boolean(formik.errors.startDate)
                      }
                      helperText={
                        formik.touched.startDate && formik.errors.startDate
                      }
                      name="startDate"
                      id="sd"
                      label="Start Date"
                    />
                  )}
                />
                <DesktopDatePicker
                  // onChange={formik.handleChange}
                  onChange={(value) =>
                    formik.setFieldValue("endDate", value, true)
                  }
                  value={formik.values.endDate}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{
                        marginTop: "2%",
                        marginLeft: "1%",
                        width: "100%",
                      }}
                      error={
                        formik.touched.endDate && Boolean(formik.errors.endDate)
                      }
                      helperText={
                        formik.touched.endDate && formik.errors.endDate
                      }
                      name="endDate"
                      id="sd"
                      label="End Date"
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <FormControl
              fullWidth={true}
              style={{
                marginTop: "2%",
                marginRight: "2%",
                marginLeft: "2%",
                width: "80%",
              }}
            >
              <InputLabel id="venue-id">Venue</InputLabel>
              <Select
                id="tname"
                label="Venue"
                labelId="venue-id"
                name="venue"
                value={formik.values.venue}
                onChange={formik.handleChange}
                error={formik.touched.venue && Boolean(formik.errors.venue)}
                helperText={formik.touched.venue && formik.errors.venue}
              >
                {approvedVenues.map((venue) => {
                  return (
                    <MenuItem value={venue.id}>{venue.venuename}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {props?.isEdit ? (
              <FormControl
                fullWidth={true}
                style={{
                  marginTop: "2%",
                  marginRight: "2%",
                  marginLeft: "2%",
                  width: "80%",
                }}
              >
                <InputLabel id="status-id">Status</InputLabel>
                <Select
                  id="status"
                  label="Status"
                  labelId="status-id"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                >
                  {sportTypes.map((sport) => {
                    return <MenuItem value={sport}>{sport}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            ) : (
              ""
            )}
            <div
              className="sport-sport-type"
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
                  marginRight: "1%",

                  width: "80%",
                }}
              >
                <InputLabel id="sport-id">Sport</InputLabel>
                <Select
                  id="sport"
                  label="Sport"
                  labelId="sport-id"
                  name="sport"
                  value={formik.values.sport}
                  onChange={formik.handleChange}
                  error={formik.touched.sport && Boolean(formik.errors.sport)}
                  helperText={formik.touched.sport && formik.errors.sport}
                >
                  <MenuItem value=""></MenuItem>
                  {sportTypes.map((sport) => {
                    return <MenuItem value={sport}>{sport}</MenuItem>;
                  })}
                </Select>
              </FormControl>

              <FormControl
                fullWidth={true}
                style={{
                  marginTop: "2%",

                  marginLeft: "1%",
                  width: "80%",
                }}
              >
                <InputLabel id="sport-type-id">Sport Type</InputLabel>
                <Select
                  id="sport"
                  label="Sport Type"
                  labelId="sport-type-id"
                  name="sportType"
                  value={formik.values.sportType}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.sportType && Boolean(formik.errors.sportType)
                  }
                  helperText={
                    formik.touched.sportType && formik.errors.sportType
                  }
                >
                  <MenuItem value={"individual"}>Individual</MenuItem>
                  <MenuItem value={"team"}>Team</MenuItem>
                </Select>
              </FormControl>
            </div>
            {formik.values.sportType == "team" ? (
              <div
                className="teams"
                style={{
                  display: "flex",
                  flex: 1,
                  width: "80%",
                }}
              >
                <TextField
                  id="nteams"
                  label="No of teams"
                  type={"number"}
                  style={{
                    marginTop: "2%",
                    marginRight: "1%",
                    width: "80%",
                  }}
                  name="noOfTeams"
                  value={formik.values.noOfTeams}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.noOfTeams && Boolean(formik.errors.noOfTeams)
                  }
                  helperText={
                    formik.touched.noOfTeams && formik.errors.noOfTeams
                  }
                ></TextField>

                <TextField
                  id="players"
                  label="No of Players per Team"
                  type={"number"}
                  style={{
                    marginTop: "2%",
                    marginLeft: "1%",
                    width: "80%",
                  }}
                  name="noOfPlayersPerTeam"
                  value={formik.values.noOfPlayersPerTeam}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.noOfPlayersPerTeam &&
                    Boolean(formik.errors.noOfPlayersPerTeam)
                  }
                  helperText={
                    formik.touched.noOfPlayersPerTeam &&
                    formik.errors.noOfPlayersPerTeam
                  }
                ></TextField>
              </div>
            ) : (
              <TextField
                id="nteams"
                label="No of Players "
                type={"number"}
                style={{
                  marginTop: "2%",
                  marginRight: "2%",
                  marginLeft: "2%",
                  width: "80%",
                }}
                name="noOfPlayers"
                value={formik.values.noOfPlayers}
                onChange={formik.handleChange}
                error={
                  formik.touched.noOfPlayers &&
                  Boolean(formik.errors.noOfPlayers)
                }
                helperText={
                  formik.touched.noOfPlayers && formik.errors.noOfPlayers
                }
              ></TextField>
            )}

            <Button
              style={{
                marginTop: "2%",
                marginRight: "2%",
                marginLeft: "2%",
                //   width: "80%",
              }}
              type="submit"
            >
              Save
            </Button>
          </form>
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Status"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {" "}
            {status.isError
              ? "Error Saving Tournament Details"
              : "Succesfully Saved Tournament"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {status.isError ? (
            <Button
              onClick={() => {
                formik.resetForm();
                handleClose();
              }}
            >
              Okay
            </Button>
          ) : (
            <Button
              onClick={() => {
                formik.resetForm();
                handleClose();
                navigate("/admin/tournament");
              }}
            >
              Okay
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
