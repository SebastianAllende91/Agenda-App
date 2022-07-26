import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import styles from "./AddContact.module.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const initialForm = {
  nombre: "",
  apellido: "",
  numero: "",
  email: "",
};

const AddContact = () => {
  const [data, setData] = useState(initialForm);
  const navigate = useNavigate();
  let user = localStorage.getItem("user");
  let { id } = useParams();

  // console.log(id);

  useEffect(() => {
    if (!id) {
      return;
    }
    const endPoint = `http://localhost:8080/contactos/${id}`;

    axios
      .get(endPoint)
      .then((resp) => {
        const apiData = resp.data;
        setData({
          id: apiData.id,
          nombre: apiData.nombre,
          apellido: apiData.apellido,
          numero: apiData.numero,
          email: apiData.email,
        });
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(data);

    axios
      .post("http://localhost:8080/contactos/save", data)
      .then((resp) => {
        // console.log(resp);
        if (resp.status === 200 && data.id !== resp.data.id) {
          // console.log("New Contact added");
          Swal.fire({
            title: "Contacto agregado exitosamente!!!",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        } else {
          Swal.fire({
            title: "Cambios realizados exitosamente!!!",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
        navigate("/");
      })
      .catch((error) => console.log(error));

    setData(initialForm);
  };

  return (
    <>
      {!user && <Navigate to={"/"} replace />}
      <Container maxWidth="md" className={styles.container}>
        <Paper elevation={6}>
          <Typography
            className={styles.title}
            variant="h4"
            component="div"
            gutterBottom
          >
            Agregar Contacto
          </Typography>
          <form className={styles.form} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} p={2}>
                <TextField
                  className={styles.input}
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  name="nombre"
                  value={data.nombre}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} p={2}>
                <TextField
                  className={styles.input}
                  id="outlined-basic"
                  label="Apellido"
                  variant="outlined"
                  name="apellido"
                  value={data.apellido}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} p={2}>
                <TextField
                  className={styles.input}
                  id="outlined-basic"
                  label="Telefono"
                  variant="outlined"
                  name="numero"
                  value={data.numero}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} p={2}>
                <TextField
                  className={styles.input}
                  id="outlined-basic"
                  label="E-mail"
                  variant="outlined"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} p={2} display="flex" justifyContent={"center"}>
                <Button
                  className={styles.btn}
                  variant="contained"
                  onClick={onSubmit}
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default AddContact;
