import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { Button, Modal, Stack, Typography } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { deleteUser, updateUserAvatar, getUser } from "../axios/axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
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

export default function AccountMenu({
  anchorEl,
  onClose,
  avatarData,
  avatarIndex,
}) {
  const avatars = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const handleLogOut = () => {
     localStorage.getItem("token");
    localStorage.removeItem("token");
    window.location.reload();
    handleClose();
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };
  const { userId } = useUserId();

  const handleDeleteUser = async () => {
    const userDeleteId = userId;
    localStorage.getItem("token");
    localStorage.removeItem("token");

    try {
      const email = localStorage.getItem("email");
      await deleteUser(email, userDeleteId);
      console.log("delete execute");
      handleCloseModal();
      localStorage.removeItem("email");
      window.location.reload();
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    handleClose();
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const [openModalAvatar, setOpenModalAvatar] = React.useState(false);
  const handleOpenModalAvatar = () => {
    handleClose();
    setOpenModalAvatar(true);
  };
  const handleCloseModalAvatar = () => {
    setOpenModalAvatar(false);
  };

  const handleAvatarClick = (avatarUrl) => {
    formik.setFieldValue("avatar", avatars.indexOf(avatarUrl));
    avatarIndex(avatars.indexOf(avatarUrl));
    setSelectedNewAvatar(avatarUrl);
  };
  const [selectedNewAvatar, setSelectedNewAvatar] = React.useState(avatarData);

  const handleChangeAvatarUser = async (data) => {
    let email = localStorage.getItem("email");
    const { data: omittedProperty, ...dataForm } = data;
    try {
      const response = await getUser(email);
      const userId = response.data.id;

      try {
        const response = await updateUserAvatar(dataForm, userId);
        console.log("update send", response);
        handleCloseModalAvatar();
      } catch (error) {
        console.log("error al obtener los datos", error);
        handleCloseModalAvatar();
      }
    } catch (error) {
      console.log("error al enviar los datos", error);
      handleCloseModalAvatar();
    }
  };
  const style = {
    modalAvatar: {
      position: "absolute",
      top: "30%",
      left: "80%",
      transform: "translate(-50%, -50%)",
      width: 750,
      backgroundColor: "#ffffff",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
      textAlign: "center",
      borderRadius: "12px",
      padding: "20px",
    },
    modalDelete: {
      position: "absolute",
      top: "30%",
      left: "80%",
      transform: "translate(-50%, -50%)",
      width: 350,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
      textAlign: "center",
      borderRadius: "12px",
    },
  };

  const formik = useFormik({
    initialValues: {
      data: "",
    },
    onSubmit: (data) => {
      handleChangeAvatarUser(data);
      handleCloseModalAvatar();
    },
  });

  React.useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!anchorEl?.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [anchorEl]);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        }}
      ></Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            cursor: "pointer",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: "5%",
            ml: "87.5%",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              cursor: "pointer",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={onClose} style={{ cursor: "pointer" }}>
          <Avatar src={selectedNewAvatar} /> Editar Perfil
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleOpenModalAvatar} style={{ cursor: "pointer" }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Editar Avatar
        </MenuItem>

        <MenuItem onClick={handleLogOut} style={{ cursor: "pointer" }}>
          <Link to="/">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
          </Link>
          Cerrar sesión
        </MenuItem>

        <MenuItem
          fontSize="small"
          color="warning"
          onClick={handleOpenModal}
          style={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <Logout color="warning" fontSize="small"></Logout>
          </ListItemIcon>
          <Box>
            <Typography> Borrar cuenta</Typography>
          </Box>
        </MenuItem>
      </Menu>

      <Modal
        open={openModalAvatar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleCloseModalAvatar}
      >
        <Stack>
          
          <form onSubmit={formik.handleSubmit}>
            <Box style={style.modalAvatar}>
            <Typography>Elige un avatar</Typography>
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
                      selectedNewAvatar === avatarUrl
                        ? "2px solid blue"
                        : "none",
                  }}
                  onClick={() => {
                    handleAvatarClick(avatarUrl);
                  }}
                  onChange={formik.handleChange}
                />
              ))}
              {selectedNewAvatar && (
                <Box>
                  <h3>Avatar seleccionado(1 cambio por sesión):</h3>
                  <img
                    src={selectedNewAvatar}
                    alt="Avatar seleccionado"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      border: "2px solid blue",
                    }}
                  />
                </Box>
              )}
              <Button
                type="submit"
                sx={{ margin: "10px" }}
                variant="contained"
                size="large"
                disabled={formik.isSubmitting}
              >
                Aceptar
              </Button>
              <Button
                onClick={handleCloseModalAvatar}
                sx={{ margin: "10px" }}
                variant="contained"
                size="large"
                color="warning"
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Stack>
      </Modal>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.modalDelete}>
          <Typography>Estás seguro de eliminar tu cuenta?</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "30px",
            }}
          >
            <Button
              color="warning"
              variant="contained"
              onClick={handleDeleteUser}
            >
              Aceptar
            </Button>
            <Button color="info" variant="contained" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
