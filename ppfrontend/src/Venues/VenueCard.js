import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function VenueCard(props) {
  const navigate = useNavigate();
  return (
    <div
      style={{ flexBasis: "30%", margin: "1%" }}
      onClick={() => navigate(`/venueOwner/venue/${props.data.id}/details`)}
    >
      <Card elevation={5}>
        <CardMedia component="img" height="140" image={props.data.url[0].url} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.data.venuename}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* {props.data.} */}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small" startIcon={<VisibilityOutlinedIcon />}>
            View
          </Button>
          <Button size="small" startIcon={<DeleteOutlineOutlinedIcon />}>
            Delete
          </Button> */}
        </CardActions>
      </Card>
    </div>
  );
}
