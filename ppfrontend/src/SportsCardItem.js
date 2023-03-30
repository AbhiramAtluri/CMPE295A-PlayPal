import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAmericanFootball,
  toggleBadminton,
  toggleBaseBall,
  toggleCricket,
  toggleSoccer,
  toggleTableTennis,
  toggleTennis,
} from "./reduxSlices/SportInterestSlice";
export default function SportsCardItem(props) {
  const dispatch = useDispatch();
  const selectedState = useSelector((state) => {
    switch (props.data.sport) {
      case "Badminton":
        return state.sportInterests.Badminton;
      case "American Football":
        return state.sportInterests.AmericanFootball;
      case "BaseBall":
        return state.sportInterests.BaseBall;
      case "Cricket":
        return state.sportInterests.Cricket;
      case "Soccer":
        return state.sportInterests.Soccer;
      case "Table Tennis":
        return state.sportInterests.TableTennis;
      case "Tennis":
        return state.sportInterests.Tennis;
    }
  });
  function handleClick() {
    switch (props.data.sport) {
      case "Badminton":
        dispatch(toggleBadminton());
        break;
      case "American Football":
        dispatch(toggleAmericanFootball());
        break;
      case "BaseBall":
        dispatch(toggleBaseBall());
        break;
      case "Cricket":
        dispatch(toggleCricket());
        break;
      case "Soccer":
        dispatch(toggleSoccer());
        break;
      case "Table Tennis":
        dispatch(toggleTableTennis());
        break;
      case "Tennis":
        dispatch(toggleTennis());
        break;
    }
  }
  return (
    <div style={{ paddingTop: 10, paddingLeft: 10 }}>
      <Card
        style={
          selectedState ? { borderStyle: "solid", borderColor: "red" } : {}
        }
        elevation="10"
        onClick={handleClick}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            width={"120"}
            image={props.data.img}
            alt="green iguana"
          />

          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {props.data.sport}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
