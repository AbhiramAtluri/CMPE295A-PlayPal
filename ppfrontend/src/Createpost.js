import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateIcon from '@mui/icons-material/Create';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import axios from 'axios';
import S3 from 'react-aws-s3';
import config from './utils/S3upload'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import {defaultImage} from './utils/DefaultImage'
window.Buffer = window.Buffer || require("buffer").Buffer;
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    height: "500px"
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function Createpost(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [getSport, setSport] = React.useState("Other")
  const [getPost,setPost] =React.useState("")

  useEffect(() => {
    axios.post()
    console.log(props)
  })

  const [getImage, setImage] = React.useState(defaultImage);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setImage(defaultImage)
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSportChange = (e) => {
    console.log(e.target.value)
    setSport(e.target.value)
  }
  const handlePostChange = (e) =>{
    console.log(e.target.value)
    setPost(e.target.value)
  }
  const handleCreatePost = () =>{
    let uploadedImage =""
      if (getImage == defaultImage){
        uploadedImage = ""
      }else{
        uploadedImage = getImage
      }

      axios.post("http://localhost:8080/feed/createPost",{posttype:getSport,location:props.details.city,postedbyid:props.details.id,posttext:getPost,postedname:props.details.firstname,mediaurl:uploadedImage,email:props.details.email})
      .then((res)=>{
        if (res.status === 200){
          handleClose()
        }
        else{
          alert("Something went wrong!")
        }
      }).catch(err=>{
        console.log(err)
      })
  }

  const handleOnPicUpload = (e) => {
    console.log("Handle pic called")
    console.log(e.target)
    let filename = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    console.log(e.target.files[0])
    const Reacts3client = new S3(config)
    Reacts3client.uploadFile(e.target.files[0], filename).then(res => {
      console.log(res)
      setImage(res.location)
    }).catch((err) => {
      console.log(err)
    })
  }
console.log(getPost)
  return (
    <Card sx={{ maxWidth: 500, minWidth: 500, }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            A
          </Avatar>
        }
        action={
          <CreateIcon aria-label="create-post" onClick={handleClickOpen}>
            <MoreVertIcon />
          </CreateIcon>
        }
        title={"Create a Post"}
      />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} minWidth="800px" >
          Create A Post
        </BootstrapDialogTitle>
        <DialogContent dividers >
          <div className='container'>
            <div className='row'>
              <form type="submit">
                <img alt="not fount" width={"300px"} src={getImage} />
                <input type="file" name='postimage' accept="image/*" onChange={(e) => { handleOnPicUpload(e) }}></input>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => handleSportChange(e)}
                  >
                    <FormControlLabel value={props.interests.interests1} control={<Radio />} label={props.interests.interests1} />
                    <FormControlLabel value={props.interests.interests2} control={<Radio />} label={props.interests.interests2} />
                    <FormControlLabel value={props.interests.interests3} control={<Radio />} label={props.interests.interests3} />
                    <FormControlLabel
                      control={<Radio />}
                      label="other"
                      value={"other"}
                    />
                  </RadioGroup>
                </FormControl>
              </form>
            </div>
          </div>
          <TextField
            id="outlined-multiline-static"
            label="Enter Something"
            multiline
            rows={8}
            fullWidth={true}
            style={{ marginTop: "50px" }}
            onChange = {(e)=>{handlePostChange(e)}}
            inputProps={{ maxLength: 300 }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCreatePost}>
            Post
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Card>
  );
}