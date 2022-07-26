import React from "react";
import { AppBar, CssBaseline, Grid, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <CssBaseline />
      <AppBar
        position="sticky"
        color="primary"
        sx={{
          top: "100vh",
          bottom: 0,
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "column",
            margin: ".5rem 0 ",
          }}
        >
          <Grid item xs={12}>
            <Typography component={"div"} variant={"h6"}>
              Copyright por Sebastian Allende
            </Typography>
          </Grid>
          <Typography component={"div"} variant={"body1"}>
            2022
          </Typography>
        </Toolbar>
      </AppBar>
    </footer>
  );
};

export default Footer;
