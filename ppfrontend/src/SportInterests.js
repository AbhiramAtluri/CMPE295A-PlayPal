import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import SportsCardItem from "./SportsCardItem";

export default function SportInterests() {
  const [sportsList, setsportsList] = useState([]);
  useEffect(() => {
    const li = [
      {
        sport: "Badminton",
        img: "./images/Badminton.png",
      },
      {
        sport: "American Football",
        img: "./images/AmericanFootball.jpeg",
      },
      {
        sport: "BaseBall",
        img: "./images/baseball.jpeg",
      },
      {
        sport: "Cricket",
        img: "./images/cricket.webp",
      },
      {
        sport: "Soccer",
        img: "./images/soccer.webp",
      },
      {
        sport: "Table Tennis",
        img: "./images/tableTennis.jpeg",
      },
      {
        sport: "Tennis",
        img: "./images/Tennis.jpeg",
      },
    ];
    setsportsList(li);
  }, []);

  return (
    <div>
      <Typography variant="h6">
        Choose Atleast 2 Sports you are Interested
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {sportsList.map((sport) => {
            return <SportsCardItem data={sport}></SportsCardItem>;
          })}
        </div>
      </Typography>
    </div>
  );
}
