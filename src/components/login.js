import { Box,  TextField, Button } from "@mui/material";
import React from "react";
import {  useFormik } from "formik";
import { loginUser, getUser } from "../axios/axios";
import * as Yup from "yup";
import { useUserId } from "./user-provider-id";

const Login = ({ onClose, onSuccess }) => {
  const {  setUserId } = useUserId();
  const [loginError, setLoginError] = React.useState("");
  const [HasError, setHasError] = React.useState(false);
  const handleClose = () => {
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email es requerido"),
      password: Yup.string().required("Password es requerido"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await handleLoginUser(values);
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleLoginUser = async (data) => {
    const dataForm = data;

    try {
      const loginSucces = await loginUser(dataForm);

      setHasError(false);

      handleClose();
      console.log("datos enviados correctamente");

      localStorage.setItem("token", loginSucces.token);
      localStorage.setItem("email", dataForm.email);

      try {
        const response = await getUser(data.email);
        const { name, avatar, id } = response.data;
        setUserId(id);
        

        handleUsersData(name, avatar, id);
      } catch (error) {
        console.log("error al obtener los datos", error);
      }
    } catch (error) {
      const errorLogin = error.response.data.message;

      setHasError(true);
      setLoginError(errorLogin);
    }
  };

  const handleUsersData = (name, avatar, id) => {
    onSuccess(name, avatar, id);
  
    
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ffffff",
            padding: "30px",
          }}
        >
          <TextField
            name="email"
            type="text"
            placeholder="Email"
            value={formik.values.email}
            sx={{ margin: "10px" }}
            onChange={formik.handleChange}
          />

          {formik.touched.email && formik.errors.email && (
            <p style={{ color: "red" }}>
              {formik.errors.email}
              {loginError}
            </p>
          )}

          <TextField
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            sx={{ margin: "10px" }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {(formik.touched.password && formik.errors.password) || HasError ? (
            <p style={{ color: "red" }}>
              {formik.errors.password}
              {loginError}
            </p>
          ) : (
            ""
          )}
          <Button
            type="submit"
            sx={{ margin: "10px" }}
            variant="contained"
            size="large"
            disabled={formik.isSubmitting}
            onBlur={formik.handleBlur}
          >
            Login
          </Button>
          <Button
            onClick={handleClose}
            sx={{ margin: "10px" }}
            variant="contained"
            size="large"
            color="warning"
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
