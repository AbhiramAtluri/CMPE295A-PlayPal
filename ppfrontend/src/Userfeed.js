import React, { Component } from 'react'
import NavBar from "./NavBar"
import { defaultBootStyle } from './Styles'
import Post from "./Post"
import axios from 'axios'
// import { test } from "./testdata"
export default class Userfeed extends Component {

  constructor(props){
    super(props)
    this.state={
      location:"San Jose",
      posts:[
        {postid:"1",location:"Banglore",postedbyid:"1",timestamp:"12:45:2021",posttext:"afdkafkasndkjasndlasndlasndlkasndlkansdlknasldnsalkndlasnd",mediaurl:"dsasdad",postedname:"Gajjala",posttype:"Badminton"},
        {postid:"1",location:"Banglore",postedbyid:"1",timestamp:"12:45:2021",posttext:"afdkafkasndkjasndlasndlasndlkasndlkansdlknasldnsalkndlasnd",mediaurl:"dsasdad",postedname:"Bokka",posttype:"Baseball"},
        {postid:"1",location:"Banglore",postedbyid:"1",timestamp:"12:45:2021",posttext:"afdkafkasndkjasndlasndlasndlkasndlkansdlknasldnsalkndlasnd",mediaurl:"dsasdad",postedname:"qwery",posttype:"Cricket"},
        {postid:"1",location:"Banglore",postedbyid:"1",timestamp:"12:45:2021",posttext:"Hey looking for folks to play a game of soccerr this weekend, Booked a location at San Jose Football center",mediaurl:"dsasdad",postedname:"sssaasasas",posttype:"Soccer"}
      ]
  }}
    
  componentDidMount(){
    console.log(this.state.posts)
    axios.post("http://localhost:8080/feed/getfeed",{"location":this.state.location})
    .then((res)=>{
      console.log(res.data.feed)
      this.setState({posts:res.data.feed})
    })
  }
  
  render() {
    return (
      <div className='container-fluid' style={defaultBootStyle}>
        <div className='row' style={{ ...defaultBootStyle }}>
          <NavBar />
        </div>
        <div className='container-fluid' style={{...defaultBootStyle,"marginTop":"40px"}}>
          {this.state.posts?.map((item, key) => {
            return <div className='row' style={defaultBootStyle}>
              <div className='col-md-3 '>
              </div>
              <div className='col-md-6 d-flex justify-content-center' style={{"marginBottom":"30px"}}>
                <Post key={key} name = {item.postedname} id = {item.postedbyid} date ={item.timestamp} text = {item.posttext} mediaurl = {item.mediaurl} location = {item.location} posttype = {item.posttype}></Post>
              </div>
              <div className='col-md-3'>
              </div>
            </div>
          })}
        </div>
      </div>
    )
  }
}
