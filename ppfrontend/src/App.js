import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { createTheme, ThemeProvider } from "@mui/material";
import Userfeed from "./Userfeed";
import NavBar from "./NavBar";
import UserLogin from "./UserLogin";
import AdminHome from "./Admin/AdminHome";
import UserProfile from "./UserProfile";
import VenueDetails from "./Admin/VenueDetails";
import VenueOwnerProfile from "./VenueOwnerProfile";
import Chat from "./ChatFolder/Chat";
import { default as VenueDetailsVO } from "./Venues/VenueDetails";
import TournamentHome from "./Admin/Tournaments/TournamentHome";
import NewTournament from "./Admin/Tournaments/NewTournament";
import VenueOwnerRegistration from "./Venues/VenueOwnerRegistration";
import VenueOwnerLogin from "./Venues/VenueOwnerLogin";
import VenueLists from "./Venues/VenueLists";
import NewVenue from "./Venues/NewVenue";
import VenueOwnerBookings from "./Venues/VenueOwnerBookings";
import UserBooking from "./Bookings/UserBooking";

export const themeOptions = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#223D56",
    },
    secondary: {
      main: "#f50057",
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: "#223D56",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          border: 0,
          borderRadius: 3,
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          color: "white",
          height: 48,
          padding: "0 30px",
        },
      },
    },
  },
  typography: {
    h1: {
      fontFamily: "Droid Serif",
    },
  },
});

export const dark = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#223D56",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          border: 0,
          borderRadius: 3,
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          color: "white",
          height: 48,
          padding: "0 30px",
        },
      },
    },
  },
});
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeOptions}>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Feed" element={<Userfeed />}></Route>
          <Route path="/UserLogin" element={<UserLogin />}></Route>
          <Route path="/venueOwner/login" element={<VenueOwnerLogin />} />
          <Route path="/Admin/Home" element={<AdminHome />}></Route>
          <Route path="/UserProfile" element={<UserProfile />}></Route>
          <Route
            path="VenueOwnerProfile"
            element={<VenueOwnerProfile />}
          ></Route>
          <Route path="/admin/tournament" element={<TournamentHome />}></Route>
          <Route
            path="/admin/tournament/new"
            element={<NewTournament />}
          ></Route>
          <Route
            path="/venueOwnerRegistration"
            element={<VenueOwnerRegistration />}
          ></Route>
          <Route
            path={"/venueOwner/venue/lists"}
            element={<VenueLists />}
          ></Route>
          <Route path="/venueOwner/venue/new" element={<NewVenue />}></Route>
          <Route
            path="/venueOwner/bookings"
            element={<VenueOwnerBookings />}
          ></Route>
          <Route
            path="/venueOwner/venue/:venueId/details"
            element={<VenueDetailsVO userType="venueOwner" />}
          ></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route
            path="/user/venue/:venueId/details"
            element={<VenueDetailsVO userType={"user"} />}
          ></Route>
          <Route path="/user/venue/booking/new" element={<UserBooking />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
