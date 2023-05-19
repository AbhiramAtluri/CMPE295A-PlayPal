import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function TournamentCard(props) {
  const navigate = useNavigate();
  {
    console.log(props.data);
  }
  return (
    <div style={{ flexBasis: "30%", margin: "1%" }}>
      <Card elevation={5}>
        {/* <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.data.tournamentname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* {props.data.} */}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            startIcon={<VisibilityOutlinedIcon />}
            onClick={(e) =>
              navigate(`/admin/tournament/${props.data.tournamentid}`)
            }
          >
            View
          </Button>
          {/* <Button size="small" startIcon={<DeleteOutlineOutlinedIcon />}>
            Delete
          </Button> */}
        </CardActions>
      </Card>
    </div>
  );
}
