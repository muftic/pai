import React, { useEffect } from "react";
import "./App.css";
import Gallery from "./pages/Gallery";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

import { fetchSubs } from "./store/submissions/actions";
import HomePage from "./pages/HomePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, dark, green, lightBlue } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import NewNav from "./components/NewNav";
import { Button, ClickAwayListener, Container } from "@mui/material";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@material-ui/icons/Save";
import { Snackbar } from "@mui/material";
import Save from "@material-ui/icons/Save";
import { Select } from "@mui/material";
function App() {
  const theme = createTheme({
    palette: {
      //mode: "dark",
      primary: {
        main: lightBlue[500],
      },
      secondary: { main: purple[100] },
    },
  });
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  const handleClick = () => {
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getUserWithStoredToken());
    dispatch(fetchSubs());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="App">
          <Container maxWidth="false">
            <NewNav />
            <Select
              value=""
              fullWidth
              displayEmpty
              variant="outlined"
              color="secondary"
            >
              <MenuItem value={1}>Soccer Ball</MenuItem>
              <MenuItem value={2}>Car</MenuItem>
              <MenuItem value={3}>Apple</MenuItem>
              <MenuItem value={4}>Sword</MenuItem>
              <MenuItem value={5}>Banana</MenuItem>{" "}
              <MenuItem value={6}>Monkey</MenuItem>
            </Select>

            <Snackbar
              onClose={handleClose}
              iconButton={Save}
              open={open}
              action={
                <div>
                  <button onClick={handleClose}>Click me</button>
                </div>
              }
              message="hey hey"
              autoHideDuration={1000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
            <MessageBox />
            {isLoading ? <Loading /> : null}
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </Container>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
