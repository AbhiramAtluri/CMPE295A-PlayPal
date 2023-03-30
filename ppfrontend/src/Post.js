import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TryIcon from '@mui/icons-material/Try';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [imageCache,setimageCache] = React.useState({
    Badminton:"./images/Badminton.png",
    Baseball:"./images/baseball.jpeg",
    Cricket:"./images/cricket.webp",
    Soccer:"./images/soccer.webp",
    Tabletennis:"./images/tableTennis.jpeg",
    Tennis:"./images/Tennis.jpeg"
  })
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  React.useEffect(()=>{
    console.log("HEDSD")
    console.log(props)
    console.log(props.mediaurl)
  })
  
  if(props.mediaurl!==""){
    return (

      <Card sx={{ maxWidth: 500, minWidth : 500 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.firstname[0]}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title= {props.name}
        subheader={props.timestamp}
      />
      <CardMedia
        component="img"
        height="200"
        image= {props.mediaurl}
        style={{"object-fit":"contain"}}
      />
      <CardContent style={{"height":"150px"}}>
        <Typography variant="body1" color="text.secondary" style={{"word-break":"break-word"}}>
         {props.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <TryIcon/>
        </IconButton>
      </CardActions>
    </Card>
  
    );
  }else{
    return (

      <Card sx={{ maxWidth: 500, minWidth : 500 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.firstname[0]}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title= {props.name}
        subheader={props.timestamp}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary" style={{"word-break":"break-word"}}>
         {props.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <TryIcon/>
        </IconButton>
      </CardActions>
    </Card>
  
    );
  }

}
