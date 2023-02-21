import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard(props) {

    const [imageCache,setimageCache] = React.useState({
        Badminton:"./images/Badminton.png",
        BaseBall:"./images/baseball.jpeg",
        Cricket:"./images/cricket.webp",
        Soccer:"./images/soccer.webp",
        Tabletennis:"./images/tableTennis.jpeg",
        Tennis:"./images/Tennis.jpeg"
      })
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageCache[props.interests]}
          alt={props.interests}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.interests}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}