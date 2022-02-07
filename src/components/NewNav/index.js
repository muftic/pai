import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
export default function NewNav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 15,
          }}
        >
          <Button component={Link} to="/gallery" variant="contained">
            Galery
          </Button>
          <Button component={Link} to="/" variant="contained">
            Home
          </Button>
          <Button variant="contained">About</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
