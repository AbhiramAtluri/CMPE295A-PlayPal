import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function SportsCardItem(props) {
  {
    console.log(props.data.img);
  }
  return (
    <div style={{ paddingTop: 10, paddingLeft: 10 }}>
      <Card style={{ borderStyle: "solid", borderColor: "red" }} elevation="10">
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
            {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
