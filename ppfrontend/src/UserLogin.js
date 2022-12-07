import React from "react";
import styles from "./Home.css";
import { Button, TextField, Typography } from "@mui/material";
import image from "./logo.png";
import coverImg from "./cover_image_sports.jpg";
import { useFormik } from "formik";
import { Link , Navigate} from "react-router-dom";
import * as yup from "yup";
import axios from "axios";


const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
export default function UserLogin() {
  const [redirectFeed,setredirectFeed] = React.useState(false)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("inside submit");
      axios.post("http://localhost:8080/auth/user/login",{...values}).then((res)=>{
        if(res.status == 401){
          alert("Wrong Password")
        }else{
          console.log("Success")
          setredirectFeed(true)
        }
      }).catch((err)=>{
        alert("Wrong Password")
      })
      // alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="main">
      <div className="left">
        <img src={image} className="logo"></img>
        <img src={coverImg} className="coverImg"></img>
        <div>
          <Typography variant="h6" className="byline">
            Meet Players in your City and Play
          </Typography>
          <Typography variant="h6" className="byline">
            Participate in Tournaments
          </Typography>
          <Typography variant="h6" className="byline">
            Book Venues
          </Typography>
        </div>
      </div>
      <div
        className="right"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          //   borderStyle: "solid",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">User Login</Typography>

        <div
          className="loginForm"
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            width: "100%",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",

              width: "100vh",
              flex: 1,
            }}
          >
            <TextField
              name="email"
              label="Email ID"
              style={{ width: "100%", margin: "2%" }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            ></TextField>
            <TextField
              name="password"
              type="password"
              label="Password"
              style={{ width: "100%", margin: "2%" }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            ></TextField>
            <Button type="submit" style={{ margin: "2%", width: "100%" }}>
              Login
            </Button>
            <div
              style={{
                margin: "2%",
                display: "flex",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Typography variant="p" style={{ paddingRight: "0.5%" }}>
                Not a member?{" "}
              </Typography>
              <Link to={"/Home"}> Register Here!</Link>
            </div>
          </form>
        </div>
      </div>
      {redirectFeed ==true?<Navigate to={{pathname:"/Feed"}}></Navigate>:""}
    </div>
  );
}
