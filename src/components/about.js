import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        background: "rgb(51,57,57)",
        background:
          "linear-gradient(90deg, rgba(51,57,57,1) 0%, rgba(100,62,113,0.5354516806722689) 100%)",
        padding: "100px",
      }}
    >
      <Box
        style={{
          Auto: "40%",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <Typography
          style={{ fontSize: "20px", fontWeight: "800", marginBottom: "30px" }}
        >
          La Responsabilidad de Un buen Registro
        </Typography>
        <Typography>
          En primer lugar, al registrar a los empleados, se obtiene información
          valiosa sobre su Nombre y Salario. Estos detalles permiten
          personalizar la página web con datos auténticos, lo que contribuye a
          establecer un ambiente más profesional y creíble para los visitantes.
          Además, el registro de empleados ayuda a generar contenido coherente y
          cohesivo para la página. En lugar de utilizar texto ficticio como
          "lorem ipsum", se pueden emplear los perfiles de los empleados para
          presentar ejemplos de trabajos realizados, logros alcanzados y
          responsabilidades asumidas. Esto brinda una visión más realista y
          persuasiva sobre los servicios o productos ofrecidos. Asimismo, contar
          con registros precisos de los empleados facilita la actualización
          constante del contenido de la página web. Si se contrata a nuevos
          empleados o se producen cambios en el personal existente, la
          información puede actualizarse rápidamente para reflejar la situación
          actual de la empresa.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link to={"/"}>
            <Button variant="contained">Volver</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
