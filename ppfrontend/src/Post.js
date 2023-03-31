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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TryIcon from '@mui/icons-material/Try';
import ResponsiveDialog from './ResponsiveDialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

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
  const [imageCache, setimageCache] = React.useState({
    Badminton: "./images/Badminton.png",
    Baseball: "./images/baseball.jpeg",
    Cricket: "./images/cricket.webp",
    Soccer: "./images/soccer.webp",
    Tabletennis: "./images/tableTennis.jpeg",
    Tennis: "./images/Tennis.jpeg"
  })
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddChat = () => {

    axios.post("http://localhost:8080/chat/getEmail", { "id": props.id })
      .then((res) => {
        console.log(res.data)
        let details = JSON.parse(sessionStorage.getItem("details"))
        axios.post("http://localhost:8080/chat/addContact", { "email": details.email, "contactemail": res.data.email })
          .then((res) => {
            console.log(res.data)
            if (res.data === "Duplicate") {
              alert("Contact already added")
            }
            else {
              alert("Contact added")
            }
            handleClose()
          })
      })
  }

  React.useEffect(() => {
    console.log("HEDSD")
    console.log(props)
    console.log(props.mediaurl)
  })

  if (props.mediaurl !== "") {
    return (

      <Card sx={{ maxWidth: 500, minWidth: 500 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {props.firstname[0]}
            </Avatar>
          }
          title={props.firstname + " " + props.lastname}
          subheader={props.timestamp}
        />
        <CardMedia
          component="img"
          height="200"
          image={props.mediaurl}
          style={{ "object-fit": "contain" }}
        />
        <CardContent style={{ "height": "150px" }}>
          <Typography variant="body1" color="text.secondary" style={{ "word-break": "break-word" }}>
            {props.text}
          </Typography>
        </CardContent>
        <CardActions onClick={handleClickOpen}>
          <IconButton aria-label="add to favorites">
            <TryIcon />
          </IconButton>
        </CardActions>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <center>{"Add a connection"}</center>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to add {props.firstname + " " + props.lastname} into your contacts?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} style={{ "marginRight": "120px" }}>
              Disagree
            </Button>
            <Button onClick={handleAddChat} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Card>

    );
  } else {
    return (
      <Card sx={{ maxWidth: 500, minWidth: 500 }}>
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
          title={props.firstname + " " + props.lastname}
          subheader={props.timestamp}
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary" style={{ "word-break": "break-word" }}>
            {props.text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing onClick={handleClickOpen}>
          <IconButton aria-label="add to favorites">
            <TryIcon />
          </IconButton>
        </CardActions>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <center>{"Add a connection"}</center>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to add {props.firstname + " " + props.lastname} into your contacts?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} style={{ "marginRight": "120px" }}>
              Disagree
            </Button>
            <Button onClick={handleAddChat} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Card>

    );
  }
}