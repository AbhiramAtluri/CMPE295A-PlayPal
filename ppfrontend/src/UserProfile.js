import AdminNavBar from './Admin/AdminNavBar'
import Button from '@mui/material/Button'
import React from 'react'
import MediaCard from './Review_Card'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { TextField, Typography } from '@mui/material'
import { useState ,useEffect} from 'react'
import SportsCricketIcon from '@mui/icons-material/SportsCricket'
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball'
import SportsTennisIcon from '@mui/icons-material/SportsTennis'
import FormDialog from './Dialoue_box_function'
import axios from 'axios';
import S3 from 'react-aws-s3';
import config from './utils/S3upload'

function UserProfile(props) {
  const [EditProfileDetails, setEditProfileDetails] = useState(true)
  const [firstname,setfirstname] = useState("")
  const [lastname,setlastname] = useState("")
  const [profilepicture,setprofilepicture] = useState("")
  const [location,setlocation] = useState("")
  const [dob,setdob] = useState("")
  const [mobile,setmobile] = useState("")
  const [interest1,setinterest1] = useState("")
  const [interest2,setinterest2] = useState("")
  const [interest3,setinterest3] = useState("")

  useEffect(() => {
    console.log(props.email)
       if(props.email == undefined){
        let details = JSON.parse(sessionStorage.getItem("details"))
        getProfile(details.email)
       }else{
        getProfile(props.email)
       }
  },[]);

  const getProfile = (email)=>{
    console.log(email)
    axios.post("http://localhost:8080/userprofile/getProfile",{"email":email})
    .then((res)=>{
      console.log("Hey")
      console.log(res.data)
      setfirstname(res.data.firstname)
      setlastname(res.data.lastname)
      setdob(res.data.dob)
      setlocation(res.data.city)
      setmobile(res.data.mobile)
    }).catch((err)=>{

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
      setprofilepicture(res.location)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <div>
        <AdminNavBar></AdminNavBar>
      </div>
      <div>
        <div style={{ display: 'flex', direction: 'row' }}>
          <div>
            <Avatar
              alt="Profile Picture"
              src={profilepicture}
              sx={{ width: 400, height: 400 }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                // flexDirection: 'column',
              }}
            >
              {EditProfileDetails?<input type={"file"} accept="image/*" onChange={handleOnPicUpload}>

              </input>:<Button onClick={() => setEditProfileDetails(true)}>
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
                  {/* <Button>Register as a Coach</Button> */}
                </Typography>
              )}
            </div>
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
              <ListItem>
                <label>First Name : </label>
                {EditProfileDetails ? (
                  <TextField placeholder={firstname}></TextField>
                ) : (
                  <Typography>{firstname}</Typography>
                )}
              </ListItem>
              <ListItem>
                <label>Last Name: </label>
                {EditProfileDetails ? (
                  <TextField placeholder={lastname}></TextField>
                ) : (
                  <Typography>{lastname}</Typography>
                )}
              </ListItem>
              <ListItem>
                <label>Date of Birth : </label>
                {EditProfileDetails ? (
                  <TextField type={"date"}></TextField>
                ) : (
                  <Typography>{dob}</Typography>
                )}
              </ListItem>
              <ListItem>
                <label>Location : </label>
                {EditProfileDetails ? (
                  <TextField placeholder='location'></TextField>
                ) : (
                  <Typography> {location}</Typography>
                )}
              </ListItem>
              <ListItem>
                <label> Mobile Number: </label>
                {EditProfileDetails ? (
                  <TextField placeholder={mobile}></TextField>
                ) : (
                  <Typography> {mobile}</Typography>
                )}
              </ListItem>
              <ListItem>
                <label>Interests :</label>
                {EditProfileDetails ? (
                  <TextField></TextField>
                ) : (
                  <Typography>
                    <SportsBasketballIcon></SportsBasketballIcon>
                    <SportsCricketIcon></SportsCricketIcon>
                    <SportsTennisIcon></SportsTennisIcon>
                  </Typography>
                )}
              </ListItem>
            </List>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <ListItem>
                {EditProfileDetails ? (
                  <Button onClick={() => setEditProfileDetails(false)}>
                    Cancel
                  </Button>
                ) : (
                  ''
                )}
              </ListItem>
              <ListItem>
                {EditProfileDetails ? <Button>Save</Button> : ''}
              </ListItem>
            </div>
          </List>
        </div>
      </div>

      <div class="flexbox-container">
        <div style={{ padding: '3%' }}>
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
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <MediaCard
            name="Rohit"
            review="John is way ahead of everyone, including most of the instructors."
            value={4}
          ></MediaCard>
          <MediaCard
            name="Harsha"
            review="Unlike other instructors he keeps his guidance and help even after the training session."
            value={5}
          ></MediaCard>
          <MediaCard
            name="Abhiram"
            review="He is one of those rare instructors who goes over and above right from the start."
            value={5}
          ></MediaCard>
          <MediaCard
            name="Anuhya"
            review="One of the best instructors ever!"
            value={4}
          ></MediaCard>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
