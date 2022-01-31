import React, { useEffect } from "react";
import "./App.css";
import Gallery from "./components/Gallery";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

import { fetchSubs } from "./store/submissions/actions";
import HomePage from "./pages/HomePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, dark, green } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import NewNav from "./components/NewNav";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: purple[500],
      },
    },
  });
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
    dispatch(fetchSubs());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme="true">
        <div className="App">
          <NewNav />
          <Navigation />
          <MessageBox />
          {isLoading ? <Loading /> : null}
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<Gallery />} />
          </Routes>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
