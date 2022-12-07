import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { createTheme, ThemeProvider } from "@mui/material";
import Userfeed from "./Userfeed";
import Sidebar from "./Sidebar"
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
        </Routes>
        <Routes>
          <Route path="/Feed" element={<Userfeed/>}></Route>
        </Routes>
        <Routes>
          <Route path = "/sidebar" element = {<Sidebar/>}></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
