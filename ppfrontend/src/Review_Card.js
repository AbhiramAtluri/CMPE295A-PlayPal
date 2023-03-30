import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
// import Typography from '@mui/material/Typography'

export default function MediaCard(props) {
  //   const [value, setValue] = React.useState(2)
  const value = 3
  return (
    <Card sx={{ maxWidth: 250 }}>
      {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
      <CardContent>
        <div>
          {/* <Typography component="legend">Controlled</Typography> */}
          <label>
            <Rating
              name="simple-controlled"
              value={props.value}
              // onChange={(event, newValue) => {
              //   setValue(newValue)
              // }}
            />
          </label>
        </div>

        <Typography gutterBottom variant="h6" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica */}
          {props.review}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  )
}
