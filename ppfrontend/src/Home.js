import React from "react";
import styles from "./Home.css";
import image from "./logo.png";
import coverImg from "./cover_image_sports.jpg";
import Registration from "./Registration";

import { Typography } from "@mui/material";

export default function Home() {
  return (
    <div className="main">
      <div className="left">
        <img src={"./images/logo.png"} className="logo"></img>
        <img src={coverImg} className="coverImg"></img>
        <div>
          <Typography variant="h6" className="byline">
            Meet Players in your City and Play
          </Typography>
          <Typography variant="h6" className="byline">
            Participate in Tournaments
          </Typography>
          <Typography variant="h6" className="byline">
            Book Venues
          </Typography>
        </div>
      </div>
      <div className="right">
        <Registration></Registration>
      </div>
    </div>
  );
}
