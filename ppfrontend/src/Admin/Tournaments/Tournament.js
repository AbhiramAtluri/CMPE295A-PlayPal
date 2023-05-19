import React, { useEffect, useState } from "react";
import AdminNavBar from "../AdminNavBar";
import { useDispatch, useSelector } from "react-redux";
import { getTournamentDetails } from "../../reduxSlices/AdminTournamentslice";
import { useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import NewTournament from "./NewTournament";

export default function Tournament() {
  const [mode, setmode] = useState("view");
  const tournamentDetails = useSelector(
    (state) => state.adminTournament.tournamentDetails
  );
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getTournamentDetails(params.id));
  }, [params.id]);
  const toggleMode = () => {
    if (mode == "view") setmode("edit");
    else setmode("view");
  };
  return (
    <React.Fragment>
      {mode == "edit" ? <NewTournament mode="edit" /> : ""}
      {mode == "view" ? (
        <div>
          <div>
            <AdminNavBar />
          </div>
          <div className="details">
            {tournamentDetails.map((details) => (
              <div>
                <div>
                  <div style={styles.details}>
                    <div style={styles.row}>
                      <label style={styles.labels}>Tournament Name</label>
                      <Typography sx={{ paddingLeft: "3%" }}>
                        {details.tournamentname.toUpperCase()}
                      </Typography>
                    </div>
                    <div style={styles.row}>
                      <label style={styles.labels}>Sport</label>
                      <Typography sx={{ paddingLeft: "3%" }}>
                        {details.sport.toUpperCase()}
                      </Typography>
                    </div>
                    <div style={styles.row}>
                      <label style={styles.labels}>Sport Type</label>
                      <Typography sx={{ paddingLeft: "3%" }}></Typography>
                      {details.sporttype.toUpperCase()}
                    </div>
                    <div style={styles.row}>
                      <label style={styles.labels}>Start Date</label>
                      <Typography sx={{ paddingLeft: "3%" }}>
                        {`${details.startdate}`}
                      </Typography>
                    </div>
                    <div style={styles.row}>
                      <label style={styles.labels}>End Date</label>
                      <Typography sx={{ paddingLeft: "3%" }}>
                        {details.enddate}
                      </Typography>
                    </div>
                    <div style={styles.row}>
                      <label style={styles.labels}>No of Players</label>
                      <Typography sx={{ paddingLeft: "3%" }}>
                        {details.noofplayers}
                      </Typography>
                    </div>
                    <div style={styles.row}>
                      <label style={styles.labels}>No of Teams</label>
                      <Typography sx={{ paddingLeft: "3%" }}>
                        {details.noofteams}
                      </Typography>
                    </div>
                    <div style={styles.row}>
                      <label style={styles.labels}>
                        No of Players per team
                      </label>
                      <Typography sx={{ paddingLeft: "3%" }}>
                        {details.noofplayersperteam}
                      </Typography>
                    </div>
                    <div style={styles.row}>
                      <label style={styles.labels}>Venue Name</label>
                      <Typography sx={{ paddingLeft: "3%" }}>
                        {details.venuename.toUpperCase()}
                      </Typography>
                    </div>
                    <div style={styles.row}>
                      <label style={styles.labels}>Venue Address</label>
                      <Typography sx={{ paddingLeft: "3%" }}>
                        {details.address + " , " + details.city}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="action-buttons" style={{ marginLeft: "3%" }}>
              {/* <Button style={styles.labels} onClick={toggleMode}>
                {mode == "view" ? "Edit" : "Save"}
              </Button> */}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
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
