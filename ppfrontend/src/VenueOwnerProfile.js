import AdminNavBar from './Admin/AdminNavBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import React from 'react'
import MediaCard from './Review_Card'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { TextField, Typography } from '@mui/material'
import { useState } from 'react'
import SportsCricketIcon from '@mui/icons-material/SportsCricket'
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball'
import SportsTennisIcon from '@mui/icons-material/SportsTennis'
import FormDialog from './Dialoue_box_function'
import QuiltedImageList from './ImageListMaterialUI'

function VenueOwnerProfile() {
  const [EditProfileDetails, setEditProfileDetails] = useState(false)
  return (
    <div>
      <div>
        <AdminNavBar></AdminNavBar>
      </div>
      <div>
        <div style={{ display: 'flex', direction: 'row' }}>
          <div>
            <QuiltedImageList></QuiltedImageList>
            {/* <Avatar
              alt="Profile Picture"
              src="https://superstarsbio.com/wp-content/uploads/2019/12/actor-Brahmanadam.jpg"
              sx={{ width: 400, height: 400 }}
            /> */}
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
                    text="Register Venue"
                    content="To register this venue, please give us more details about the venue in the given box below. Someone from our admin team will
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
                Venue Information
              </Typography>
            </List>

            <List style={{ textAlign: 'center' }}>
              <ListItem>
                <label>Venue Name : </label>
                {EditProfileDetails ? (
                  <TextField></TextField>
                ) : (
                  <Typography> R spot</Typography>
                )}
              </ListItem>
              <ListItem>
                <label>Type of Sport : </label>
                {EditProfileDetails ? (
                  <TextField></TextField>
                ) : (
                  <Typography> Indoor Cricket, Badminton</Typography>
                )}
              </ListItem>
              <ListItem>
                <label>Venue Address : </label>
                {EditProfileDetails ? (
                  <TextField></TextField>
                ) : (
                  <Typography> San Jose, California</Typography>
                )}
              </ListItem>
              <ListItem>
                <label>Venue Price (hourly) :</label>
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
              <ListItem>
                <label>Mobile Number : </label>
                {EditProfileDetails ? (
                  <TextField></TextField>
                ) : (
                  <Typography> +1 999-999-9999</Typography>
                )}
              </ListItem>
              <ListItem>
                <label>Number of Slots : </label>
                {EditProfileDetails ? (
                  <TextField></TextField>
                ) : (
                  <Typography> NA</Typography>
                )}
              </ListItem>
              <ListItem>
                <label>Parking : </label>
                {EditProfileDetails ? (
                  <TextField></TextField>
                ) : (
                  <Typography> Available</Typography>
                )}
              </ListItem>
              <ListItem>
                <label>Showers : </label>
                {EditProfileDetails ? (
                  <TextField></TextField>
                ) : (
                  <Typography> Not Available</Typography>
                )}
              </ListItem>
              <ListItem>
                <label>Onsite Equipment Rentals : </label>
                {EditProfileDetails ? (
                  <TextField></TextField>
                ) : (
                  <Typography> Available</Typography>
                )}
              </ListItem>
              <ListItem>
                <label>Lockers onsite : </label>
                {EditProfileDetails ? (
                  <TextField></TextField>
                ) : (
                  <Typography> Not Available</Typography>
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
            Venue Reviews
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <MediaCard
            name="Rohit"
            review="The facility offers a wide variety of sports, including basketball, volleyball, and badminton. The facility also offers a variety of leagues and tournaments for those who are looking for a more competitive experience."
            value={4}
          ></MediaCard>
          <MediaCard
            name="Harsha"
            review="The courts are well-maintained, and the equipment provided is of high quality."
            value={5}
          ></MediaCard>
          <MediaCard
            name="Abhiram"
            review="The staff is very friendly and helpful, and the pricing is reasonable. I would highly recommend this indoor game point for anyone looking to have fun and get some exercise."
            value={5}
          ></MediaCard>
          <MediaCard
            name="Anuhya"
            review=" The venue is spacious and clean, and the courts are always in great condition. The staff is very accommodating, and they make sure that everyone has a great time."
            value={4}
          ></MediaCard>
        </div>
      </div>
    </div>
  )
}

export default VenueOwnerProfile
