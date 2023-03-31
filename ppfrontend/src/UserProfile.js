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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

function UserProfile(props) {
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

  const [editedfirstname,seteditedfirstname] = useState(firstname)
  const [editedlastname,seteditedlastname] = useState(lastname)
  const [editedlocation,seteditedlocation] = useState(location)
  const [editedmobile,seteditedmobile] = useState(mobile)
  const [editeddob,setediteddob] = useState(dob)
  const [editedprofilepicture,seteditedprofilepicture] = useState("")
  const [editedinterest1,seteditedinterest1] = useState(interest1)
  const [editedinterest2,seteditedinterest2] = useState(interest2)
  const [editedinterest3,seteditedinterest3] = useState(interest3)
  

  


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
              src={editedprofilepicture}
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
                  <TextField placeholder='location'></TextField>
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
              {/* <ListItem>
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
              </ListItem> */}
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
              <ListItem>
                {EditProfileDetails ? <Button onClick={handleSaveProfile }>Save</Button> : ''}
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
