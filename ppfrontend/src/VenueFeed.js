import React from 'react'
import NavBar from "./NavBar"
import {useEffect} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function VenueFeed() {

  const [venueList,setVenueList] = React.useState([])

  useEffect(() => {
    let details = JSON.parse(sessionStorage.getItem("details"))
    axios.post("http://localhost:8080/venueFeed/getVenueFeed",{location:details.city}).then(res=>{
      console.log(res.data)
      setVenueList(res.data)
    })
  
  },[]);
  const navigate = useNavigate();

  const goToVenueDetails = (id)=>{
     navigate(`/user/venue/${id}/details`)
  }


  return (
    <div>
      <NavBar></NavBar>
      <div className='row' style={{marginTop:"20px"}}>
        {venueList.length?venueList.map((value,key)=>{
          return <div className='col-md-4 d-flex justify-content-center' style={{marginTop:"20px"}}>
                      
          <Card sx={{minWidth:400 }} onClick={()=>goToVenueDetails(value.id)}>
          <CardHeader
            // avatar={
            //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            //     R
            //   </Avatar>
            // }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={value.venuename}
            subheader={value.address}
          />
          <CardMedia
            component="img"
            height="194"
            src={value.url[0].url}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
 
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Typography>
            </Typography>
            {/* <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
          </CardActions>
        </Card>

          </div>
          










        }):<></>}
       
      </div>
    </div>
  )
}

