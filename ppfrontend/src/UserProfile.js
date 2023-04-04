import Button from '@mui/material/Button'
import React from 'react'
import MediaCard from './Review_Card'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem'
import { TextField, Typography } from '@mui/material'
import { useState ,useEffect} from 'react'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import FormDialog from './Dialoue_box_function'
import axios from 'axios';
import S3 from 'react-aws-s3';
import config from './utils/S3upload'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating'
import NavBar from "./NavBar"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



function UserProfile(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(2)
  const [EditProfileDetails, setEditProfileDetails] = useState(false)
  const [id,setid] = useState("")
  const [firstname,setfirstname] = useState("")
  const [lastname,setlastname] = useState("")
  const [profilepicture,setprofilepicture] = useState("")
  const [location,setlocation] = useState("")
  const [dob,setdob] = useState("")
  const [mobile,setmobile] = useState("")
  const [interest1,setinterest1] = useState("")
  const [interest2,setinterest2] = useState("")
  const [interest3,setinterest3] = useState("")
  const [review,setreview] = useState("")
  const [editedfirstname,seteditedfirstname] = useState(firstname)
  const [editedlastname,seteditedlastname] = useState(lastname)
  const [editedlocation,seteditedlocation] = useState(location)
  const [editedmobile,seteditedmobile] = useState(mobile)
  const [editeddob,setediteddob] = useState(dob)
  const [editedprofilepicture,seteditedprofilepicture] = useState("")
  const [editedinterest1,seteditedinterest1] = useState(interest1)
  const [editedinterest2,seteditedinterest2] = useState(interest2)
  const [editedinterest3,seteditedinterest3] = useState(interest3)
  const [profileEditable,setprofileEditable] = useState(true)
  const [reviewList,setreviewList] = useState([])
  const [email,setemail] = useState("")

  const history = useLocation()

  useEffect(() => {
       if(history.state == null){
        let details = JSON.parse(sessionStorage.getItem("details"))
        getProfile(details.email)
        setemail(details.email)
        getReviews(details.id)

       }else{
        const {email,id} = history.state
        console.log(email+"state")
        setemail(email)
        setprofileEditable(false)
        getProfile(email)
        getReviews(id)
       }

  },[]);

  const getProfile = (email)=>{
    console.log(email)
    axios.post("http://localhost:8080/userprofile/getProfile",{"email":email})
    .then((res)=>{
      console.log("Hey")
      console.log(res.data)
      setfirstname(res.data.firstname)
      seteditedfirstname(res.data.firstname)
      setlastname(res.data.lastname)
      seteditedlastname(res.data.lastname)
      setid(res.data.id)
      setdob(res.data.dob)
      setediteddob(res.data.dob)
    
      setlocation(res.data.city)
      seteditedlocation(res.data.city)
      setinterest1(res.data.interests1)
      seteditedinterest1(res.data.interests1)
      setinterest2(res.data.interests2)
      seteditedinterest2(res.data.interests2)
      setinterest3(res.data.interests3)
      seteditedinterest3(res.data.interests3)
      setprofilepicture(res.data.photo)
      seteditedprofilepicture(res.data.photo)
      setmobile(res.data.mobile)
      seteditedmobile(res.data.mobile)
    }).catch((err)=>{
    })
  }

  const getReviews= (id)=>{
    console.log(id)
    axios.post("http://localhost:8080/userprofile/getReviews",{"toUserId":id}).then((res)=>{
      console.log(res)
      setreviewList(res.data)
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
      seteditedprofilepicture(res.location)
    }).catch((err) => {
      console.log(err)
    })
  }
 const onInterest1Change = (e)=>{
  console.log(e.target.value)
  seteditedinterest1(e.target.value)
 }
 const onInterest2Change = (e)=>{
  console.log(e.target.value)
  seteditedinterest2(e.target.value)
 }
 const onInterest3Change = (e)=>{
  console.log(e.target.value)
  seteditedinterest3(e.target.value)
 }
 const onfirstnameChange = (e)=>{
   seteditedfirstname(e.target.value)
 }

 const onlastnameChange = (e)=>{
  seteditedlastname(e.target.value)
}

const onChangeDoB = (e)=>{
   setediteddob(e.target.value)
}
const onChangeMobile = (e)=>{
  seteditedmobile(e.target.value)
}

 const onCancel = (e)=>{
  seteditedinterest1(interest1)
  seteditedinterest2(interest2)
  seteditedinterest3(interest3)
  setEditProfileDetails(false)
 }

 const handleSaveProfile = ()=>{
  axios.post("http://localhost:8080/userprofile/updateProfile",{
    "firstname":editedfirstname,
    "lastname":editedlastname,
    "mobile":editedmobile,
    "city":editedlocation,
    "interests1":editedinterest1,
    "interests2":editedinterest2,
    "interests3":editedinterest3,
    "photo":editedprofilepicture,
    "dob":editeddob,
    "id":id
  }).then((res)=>{
    setEditProfileDetails(false)
    getProfile(email)
  })

 }
 const handleClickOpen = () => {
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};

const handleReviewEntry = (e) =>{
   console.log(e.target.value)
   setreview(e.target.value)
}

const postReview = () =>{
  if(id ==JSON.parse(sessionStorage.getItem("details")).id)
  {
    alert("Sel Review Not possible")
    setOpen(false)
  }else{
    axios.post("http://localhost:8080/userprofile/addReview",{
      "toUserId":id,
      "fromUserId":JSON.parse(sessionStorage.getItem("details")).id,
      "rating":value,
      "reviewText":review
  })
  .then((res)=>{
alert("Review Posted")
getReviews(id)
setOpen(false)
  }).catch((err)=>{
    console.log(err)
  })
  }

}

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

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
  

  return (
    <div>
      <div>
        <NavBar></NavBar>
      </div>
      <div>
        <div style={{ display: 'flex', direction: 'row' }}>
          <div>
            <Avatar
              alt="Profile Picture"
              src={editedprofilepicture}
              sx={{ width: 400, height: 400 }}
            />
            {profileEditable?<div
              style={{
                display: 'flex',
                justifyContent: 'center',
                // flexDirection: 'column',
              }}
            >
              {EditProfileDetails?<input type={"file"} accept="image/*" onChange={handleOnPicUpload}>
            
              </input>:
              <Button onClick={() => setEditProfileDetails(true)}>
                Edit Profile
              </Button>}

              {EditProfileDetails ? (
                ''
              ) : (
                <Typography>
                  <FormDialog
                    text="Register as a Coach"
                    content="To register as a coach, please give us more details about your
            expertise in the given box below. Someone from our admin team will
            go through the request and verify."
                  ></FormDialog>
                </Typography>
              )}
            </div>:<></>}
  
          </div>

          <List>
            <List>
              <Typography
                variant="h5"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'fantasy',
                  fontWeight: 1000,
                  letterSpacing: '.2rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                User Profile
              </Typography>
            </List>

            <List style={{ textAlign: 'center' }}>
              <div className='row'>
              <ListItem>
              <div className='col-md-6'>
                <label>First Name : </label>
                </div>
                <div className='col-md-6'>
                {EditProfileDetails ? (
                  <TextField placeholder={firstname} onChange={onfirstnameChange}></TextField>
                ) : (
                  <Typography>{firstname}</Typography>
                )}
                </div>           
              </ListItem>
              </div>

              <div className='row'>
              <ListItem>
                <div className='col-md-6'>
                <label>Last Name: </label>
                </div>
                <div className='col-md-6'>
                {EditProfileDetails ? (
                  <TextField placeholder={lastname} onChange={onlastnameChange}></TextField>
                ) : (
                  <Typography>{lastname}</Typography>
                )}
                </div>

              </ListItem>

              </div>
              <div className='row'>
              <ListItem>
                <div className='col-md-6'>
                <label>Date of Birth : </label>
                </div>
                <div className='col-md-6'>                
                {EditProfileDetails ? (
                  <TextField type={"date"} onChange={onChangeDoB}></TextField>
                ) : (
                  <Typography>{dob}</Typography>
                )}
                </div>
              </ListItem>
              </div>
              <div className='row'>
              <ListItem>
                <div className='col-md-6'>
                <label>Location : </label>
                </div>
                <div className='col-md-6'>
                {EditProfileDetails ? (
                  <TextField placeholder={location}></TextField>
                ) : (
                  <Typography> {location}</Typography>
                )}
                </div>
              </ListItem>
              </div>
              <div className='row'>
              <ListItem>
                <div className='col-md-6'>
                <label> Mobile Number: </label>
                </div>
                <div className='col-md-6'>
                {EditProfileDetails ? (
                  <TextField placeholder={mobile} onChange={onChangeMobile}></TextField>
                ) : (
                  <Typography> {mobile}</Typography>
                )}
                </div>
              </ListItem>
              <ListItem>
                <div className='col-md-6'>
                <label> Interests 1</label>
                </div>
                <div className='col-md-6'>
                {EditProfileDetails ? (
               
                            <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={editedinterest1}
                          defaultValue = {editedinterest1}
                          onChange={onInterest1Change}
                        >
                          <MenuItem value={"Badminton"}>Badminton</MenuItem>
                          <MenuItem value={"BaseBall"}>BaseBall</MenuItem>
                          <MenuItem value={"Cricket"}>Cricket</MenuItem>
                          <MenuItem value={"Soccer"}>Soccer</MenuItem>
                          <MenuItem value={"Table Tennis"}>Table Tennis</MenuItem>
                          <MenuItem value={"Tennis"}>Tennis</MenuItem>
                        </Select>

                ) : (
                  <Typography> {interest1}</Typography>
                )}
                </div>
              </ListItem>
              <ListItem>
                <div className='col-md-6'>
                <label> Interests 2</label>
                </div>
                <div className='col-md-6'>
                {EditProfileDetails ? (
                            <Select
                            
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={editedinterest2}
                          defaultValue = {editedinterest2}
                          onChange={onInterest2Change}
                        >
                          <MenuItem value={"Badminton"}>Badminton</MenuItem>
                          <MenuItem value={"BaseBall"}>BaseBall</MenuItem>
                          <MenuItem value={"Cricket"}>Cricket</MenuItem>
                          <MenuItem value={"Soccer"}>Soccer</MenuItem>
                          <MenuItem value={"TableTennis"}>Table Tennis</MenuItem>
                          <MenuItem value={"Tennis"}>Tennis</MenuItem>
                          <MenuItem value={"AmericanFootball"}>American Football</MenuItem>
                        </Select>

                ) : (
                  <Typography> {interest2}</Typography>
                )}
                </div>
              </ListItem>
              <ListItem>
                <div className='col-md-6'>
                <label> Interests 3</label>
                </div>
                <div className='col-md-6'>
                {EditProfileDetails ? (
             
                            <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={editedinterest3}
                          defaultValue = {editedinterest3}
                          onChange={onInterest3Change}
                        >
                          <MenuItem value={"Badminton"}>Badminton</MenuItem>
                          <MenuItem value={"BaseBall"}>BaseBall</MenuItem>
                          <MenuItem value={"Cricket"}>Cricket</MenuItem>
                          <MenuItem value={"Soccer"}>Soccer</MenuItem>
                          <MenuItem value={"TableTennis"}>Table Tennis</MenuItem>
                          <MenuItem value={"Tennis"}>Tennis</MenuItem>
                          <MenuItem value={"AmericanFootball"}>American Football</MenuItem>
                        </Select>

                ) : (
                  <Typography> {interest3}</Typography>
                )}
                </div>
              </ListItem>
              </div>
            </List>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <ListItem>
                {EditProfileDetails ? (
                  <Button onClick={onCancel}>
                    Cancel
                  </Button>
                ) : (
                  ''
                )}
              </ListItem>
              {profileEditable?<ListItem>
                {EditProfileDetails ? <Button onClick={handleSaveProfile }>Save</Button> : ''}
              </ListItem>:<></>}

            </div>
            
          </List>
        </div>
      </div>

      <div class="flexbox-container">
        <div className='row'>
          <div className='col-md-4'>

          </div>
        <div className='col-md-4 d-flex justify-content-center' style={{ padding: '3%' }}>
          <Typography
            variant="h5"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'fantasy',
              fontWeight: 1000,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            User Reviews
          </Typography>
        </div>
        <div className='col-md-4'>

        </div>
        </div>
        <div className='row'>
       
            <div className='col-md-4'>

            </div>
            
            {!profileEditable?<div className='col-md-4 d-flex justify-content-center'>
            <Button onClick={handleClickOpen}>
            post a review?
            </Button>
            </div>:<></>}

                  


            <div className='col-md-4'>

          </div>

          
        </div>
          <div className='row'>
            {reviewList.map((data,key)=>{
            return <div className='col-md-4 d-flex justify-content-center' style={{marginTop:"30px"}}>
              <MediaCard
            name={data.firstname+ " "+data.lastname }
            review={data.reviewText}
            rating = {data.rating}
            
          ></MediaCard>
              </div>
            })}
          </div>
    
      </div>
      {open?    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Post a Review
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className='row'>
            <label>
              Rating
            </label>
          <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue)
              }}
            />

          </div>
          <div className='row'>
          <TextField
            id="outlined-multiline-static"
            label="Enter Something"
            multiline
            rows={8}
            fullWidth={true}
            style={{ marginTop: "50px",width:"500px"}}
            // onChange = {(e)=>{handlePostChange(e)}}
            inputProps={{ maxLength: 300 }}
            onChange={(e)=>handleReviewEntry(e)}
          />
          </div>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={postReview}>
            Save Review
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
      :<></>}
    </div>
  )
}

export default UserProfile
