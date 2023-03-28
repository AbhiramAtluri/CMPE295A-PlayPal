import { Button } from "@mui/material";
import React, { useEffect } from "react";
import AdminNavBar from "../AdminNavBar";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTournaments } from "../../reduxSlices/AdminTournamentslice";
import TournamentCard from "./TournamentCard";
export default function TournamentHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tournamentList = useSelector(
    (state) => state.adminTournament.tournamentList
  );
  useEffect(() => {
    dispatch(getAllTournaments());
  }, []);

  return (
    <div>
      <div style={{ position: "sticky", top: 0 }}>
        <AdminNavBar></AdminNavBar>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          margin: "1%",
          paddingRight: "2%",
        }}
      >
        <Button
          startIcon={<CreateOutlinedIcon fontSize="large" />}
          sx={{ padding: "1%" }}
          onClick={() => {
            navigate("/admin/tournament/new");
          }}
        >
          New Tournament
        </Button>
      </div>
      <div
        className="tournament-cards"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {tournamentList.map((tournament) => {
          return <TournamentCard data={tournament} />;
        })}
      </div>
    </div>
  );
}
const styles = {
  newTournament: {},
};
