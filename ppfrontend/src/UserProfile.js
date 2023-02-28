import AdminNavBar from './Admin/AdminNavBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import React from 'react'
import MediaCard from './Review_Card'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { TextField, Typography } from '@mui/material'
import { useState } from 'react'
import SportsCricketIcon from '@mui/icons-material/SportsCricket'
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball'
import SportsTennisIcon from '@mui/icons-material/SportsTennis'
import FormDialog from './Dialoue_box_function'

function UserProfile() {
  const [EditProfileDetails, setEditProfileDetails] = useState(false)
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
              src="https://superstarsbio.com/wp-content/uploads/2019/12/actor-Brahmanadam.jpg"
              sx={{ width: 400, height: 400 }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                // flexDirection: 'column',
              }}
            >
              <Button onClick={() => setEditProfileDetails(true)}>
                Edit Profile
              </Button>
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
                <label>Name : </label>
                {EditProfileDetails ? (
                  <TextField></TextField>
                ) : (
                  <Typography> Gajala</Typography>
                )}
              </ListItem>
              <ListItem>
                <label>Date of Birth : </label>
                {EditProfileDetails ? (
                  <TextField></TextField>
                ) : (
                  <Typography> 21st July, 1985</Typography>
                )}
              </ListItem>
              <ListItem>
                <label>Location : </label>
                {EditProfileDetails ? (
                  <TextField></TextField>
                ) : (
                  <Typography> San Jose, California</Typography>
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
