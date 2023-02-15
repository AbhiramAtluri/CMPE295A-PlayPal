import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function ButtonAppBar() {
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
            <Typography variant="h6" component="div" sx={{ padding: "15px" }}>
              Home
            </Typography>
            <Typography variant="h6" component="div" sx={{ padding: "15px" }}>
              Tournament
            </Typography>
          </Box>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
