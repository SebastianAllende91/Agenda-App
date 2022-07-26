import React from "react";
import Swal from "sweetalert2";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  let user = localStorage.getItem("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // PRUEBO QUE EL REGEX CUMPLE LA FUNCION DE VALIDAR UN EMAIL CORRECTO
    //console.log(regexEmail.test(email));

    if (email === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Los campos no pueden estar vacios!",
      });
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe ingresar una direccion de correo electronico valido!",
      });
      return;
    }

    if (email !== "test@mail.com" || password !== "test123") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Campos invalidos!",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: "Login exitoso!",
    });
    localStorage.setItem("user", JSON.stringify({ email, password }));
    navigate("/contactos");
  };

  return (
    <>
      {user && <Navigate to="/contactos" replace />}
      <Container maxWidth="md" className={styles.container}>
        <Paper elevation={6}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              id="outlined-basic"
              label="E-mail"
              variant="outlined"
              name="email"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type={"password"}
              variant="outlined"
              name="password"
            />
            <Button type="submit" variant="contained">
              Ingresar
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
