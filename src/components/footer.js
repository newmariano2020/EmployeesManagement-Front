import React from "react";
import { Fragment } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@mui/system";

const flipAnimation = keyframes({
  "0%": {
    transform: "rotatey(0deg)",
  },
  "100%": {
    transform: "rotatey(360deg)",
  },
});

const Footer = () => {
  return (
    <Fragment>
      <Box style={{ backgroundColor: "#545151", height: "82px" }}>
        <Typography style={{ color: "#ffffff", padding: "10px" }}>
          Creado por Cirilli Luis Mariano
        </Typography>
        <Link to='https://www.linkedin.com/in/luis-c-92499795/'>
          <LinkedInIcon
            sx={{
              backgroundColor: "#94C9B9",
              color: "blue",
              borderRadius: "10px",
              transition: "transform 0.5s ease-in-out",
              "&:hover": {
                animation: `${flipAnimation} 2s`,
              },
            }}
          />
        </Link>
      </Box>
    </Fragment>
  );
};
export default Footer;
