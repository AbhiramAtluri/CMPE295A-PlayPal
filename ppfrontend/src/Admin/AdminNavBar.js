import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { useNavigate } from "react-router-dom";
export default function AdminNavBar() {
  const navigate = useNavigate();
  const handleButtonClick = (page) => {
    if (page == "home") navigate("/admin/home");
    else if (page == "tournament") navigate("/admin/tournament");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={"/images/logo.png"} style={{ height: "50px" }}></img>
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              flexDirection: "row",
              display: "flex",
            }}
          >
            <Button sx={override} onClick={() => handleButtonClick("home")}>
              Home
            </Button>
            <Button
              sx={override}
              onClick={() => handleButtonClick("tournament")}
            >
              Tournament
            </Button>
          </Box>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
const override = {
  my: 2,
  ml: 2,
  color: "white",
  display: "block",
  background: "#223D56",
  boxShadow: "none",
};
