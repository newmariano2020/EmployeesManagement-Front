import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import { createUser, getUser} from "../axios/axios";

import Stack from "@mui/material/Stack";
import img1 from "../public-p/avatar/aire_avatar_last_airbender.jpg";
import img2 from "../public-p/avatar/flag_royal_moroccan_army.jpg";
import img3 from "../public-p/avatar/fuego_avatar_last_airbender.jpg";
import img4 from "../public-p/avatar/male_avatar_svg.jpg";
import img5 from "../public-p/avatar/sheep_icon_05_svg.jpg";
import img6 from "../public-p/avatar/superman_facebook_svg.jpg";
import img7 from "../public-p/avatar/tierra_avatar_last_airbender.jpg";
import img8 from "../public-p/avatar/wikimedia_community_logo_phabricator.jpg";
import img9 from "../public-p/avatar/woman_avatar_svg.jpg";
import { useUserId } from "./user-provider-id";

export const avatars = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const CreateUsers = ({ onClose, onSuccess }) => {
  const { setUserId } = useUserId();
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarClick = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    formik.setFieldValue("avatar", avatars.indexOf(avatarUrl));
  };

  const handleClose = () => {
    onClose();
  };

  const handleUsersData = (dataUs, dataAv, dataId) => {
    onSuccess(dataUs, dataAv, dataId);
    setUserId(dataId)
  };

  const handleCreateUser = async (data) => {
    const { data: omittedProperty, ...dataForm } = data;

    try {
       await createUser(dataForm);

     

      handleClose();

      try {
        const response = await getUser(data.email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        const dataUser = response.data.name;
        const dataAvatar = response.data.avatar;
        const resUserId = response.data.id;
        handleUsersData(dataUser, dataAvatar, resUserId);
      } catch (error) {
        console.log("error al obtener los datos", error);
      }
    } catch (error) {
      console.log("error al enviar los datos", error);
      handleClose();
    }
  };

  const formik = useFormik({
    initialValues: {
      data: "",
    },
    onSubmit: (data) => {
      handleCreateUser(data);
    },
  });

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
            name="name"
            type="text"
            placeholder="Nombre"
            value={formik.values.username}
            sx={{ margin: "10px" }}
            onChange={formik.handleChange}
          />
          <TextField
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            sx={{ margin: "10px" }}
            onChange={formik.handleChange}
          />
          <TextField
            name="email"
            type="text"
            placeholder="Email"
            value={formik.values.email}
            sx={{ margin: "10px" }}
            onChange={formik.handleChange}
          />
          <Stack>
            <Typography>Elige un avatar</Typography>
            <Box>
              {avatars.map((avatarUrl, index) => (
                <img
                  key={avatarUrl}
                  src={avatarUrl}
                  value={formik.values.avatar}
                  alt="Avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    margin: "10px",
                    cursor: "pointer",
                    border:
                      selectedAvatar === avatarUrl ? "2px solid blue" : "none",
                  }}
                  onClick={() => {
                    handleAvatarClick(avatarUrl);
                  }}
                  onChange={formik.handleChange}
                />
              ))}
              {selectedAvatar && (
                <div>
                  <h3>Avatar seleccionado:</h3>
                  <img
                    src={selectedAvatar}
                    alt="Avatar seleccionado"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      border: "2px solid blue",
                    }}
                  />
                </div>
              )}
            </Box>
          </Stack>

          <Button
            type="submit"
            sx={{ margin: "10px" }}
            variant="contained"
            size="large"
            disabled={formik.isSubmitting}
          >
            Crear Usuario
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

          {formik.errors.username && <p>Username is required</p>}
          {formik.errors.password && <p>Password is required</p>}
        </Box>
      </form>
    </Box>
  );
};

export default CreateUsers;
