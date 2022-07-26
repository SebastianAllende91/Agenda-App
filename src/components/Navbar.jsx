import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";

const classes = {
  btn: {
    margin: "0 10px",
    border: "thin solid white",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
};

const Navbar = () => {
  const navigate = useNavigate();
  let user = localStorage.getItem("user");

  useEffect(() => {
    if (user === null || user === undefined) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleRoute = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    user = localStorage.clear();
    navigate("/");
  };

  if (!user) <Navigate to={"/"} replace />;

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar style={classes.container}>
            <Grid item xs={8}>
              <ContactsIcon />
              <Button
                color="inherit"
                variant="text"
                onClick={() => handleRoute("/contactos")}
                style={classes.btn}
              >
                Agenda
              </Button>
              <Button
                color="inherit"
                variant="text"
                onClick={() => handleRoute("contactos/save")}
                style={classes.btn}
              >
                Nuevo Contacto
              </Button>
            </Grid>
            {user && (
              <Grid item xs={4}>
                <Button
                  color="inherit"
                  variant="text"
                  style={classes.btn}
                  onClick={() => handleLogout()}
                >
                  Logout
                </Button>
              </Grid>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default Navbar;
