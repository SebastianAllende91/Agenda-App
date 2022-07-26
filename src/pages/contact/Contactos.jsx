import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Contactos = () => {
  const [contacts, setContacts] = useState([]);
  let user = localStorage.getItem("user");
  const navigate = useNavigate();

  const loadContacts = useCallback(async () => {
    try {
      const result = await axios.get("http://localhost:8080/contactos");
      setContacts(result.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error, no se pudo cargar los contactos!",
      });
    }
  }, []);

  useEffect(() => {
    loadContacts();
    return () => {
      setContacts([]); // This worked for me
    };
  }, [loadContacts]);

  const handleDelete = useCallback(
    async (id, e) => {
      e.preventDefault();
      const isDelete = window.confirm(
        `Seguro desea Eliminar el usuario: ${id}.`
      );

      if (!isDelete) return;

      await axios
        .delete(`http://localhost:8080/contactos/${id}`)
        .then((resp) => {
          console.log(resp);
          if (resp.status) {
            Swal.fire({
              icon: "Success",
              title: "Operacion exitosa.",
              text: "Contacto eliminado!",
            });
            loadContacts();
          } else {
            Swal.fire({
              icon: "error",
              title: "Error.",
              text: "No se pudo eliminar el contacto!",
            });
          }
        })
        .catch(() =>
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error, Intente mas tarde!",
          })
        );
    },
    [loadContacts]
  );

  const editContact = (e, id) => {
    e.preventDefault();
    // console.log(contact);
    navigate(`/contactos/save/${id}`);
  };

  return (
    <>
      {!user && <Navigate to={"/"} replace />}

      <Container style={{ margin: "2rem auto", height: "71vh" }}>
        {contacts.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="center">Nombre</StyledTableCell>
                  <StyledTableCell align="center">Apellido</StyledTableCell>
                  <StyledTableCell align="center">Número</StyledTableCell>
                  <StyledTableCell align="center">E-mail</StyledTableCell>
                  <StyledTableCell align="center">Accion</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact) => (
                  <StyledTableRow key={contact.id}>
                    <StyledTableCell component="th" scope="row">
                      {contact.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {contact.nombre}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {contact.apellido}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {contact.numero}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {contact.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ margin: "0 5px" }}
                        onClick={(e) => editContact(e, contact.id)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ margin: "0 5px" }}
                        onClick={(e) => handleDelete(contact.id, e)}
                      >
                        Eliminar
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid itemxs={12}>
            <Typography
              component={"div"}
              variant={"h4"}
              bgcolor={"gray"}
              color={"white"}
              textAlign="center"
              borderRadius={"5px"}
              py={3}
            >
              No hay contactos en la base de datos
            </Typography>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Contactos;
