import { Fragment } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import {Link } from "react-router-dom";
import { Modal, Paper } from "@mui/material";
import Login from "./login";
import CreateUsers from "./create-user";
import { useState } from "react";
import img1 from "../public-p/avatar/aire_avatar_last_airbender.jpg";
import img2 from "../public-p/avatar/flag_royal_moroccan_army.jpg";
import img3 from "../public-p/avatar/fuego_avatar_last_airbender.jpg";
import img4 from "../public-p/avatar/male_avatar_svg.jpg";
import img5 from "../public-p/avatar/sheep_icon_05_svg.jpg";
import img6 from "../public-p/avatar/superman_facebook_svg.jpg";
import img7 from "../public-p/avatar/tierra_avatar_last_airbender.jpg";
import img8 from "../public-p/avatar/wikimedia_community_logo_phabricator.jpg";
import img9 from "../public-p/avatar/woman_avatar_svg.jpg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import AccountMenu from "./profile-menu";
import { getEmployeeFileList, getAllEmployees } from "../axios/axios";
import { saveAs } from "file-saver";


export const Avatars = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const Header = () => {

 
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDataName, setUserDataName] = useState(null);
  const [userDataAvatar, setUserDataAvatar] = useState(null);

  const [anchorElMenu, setAnchorElMenu] = useState(null);

  const handleAccountProfileClick = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorElMenu(null);
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const ImageRendering = ({ src, onClick }) => {
    return (
      <>
        <img
          src={src}
          onClick={onClick}
          alt="Avatar seleccionado"
          style={{
            width: "75px",
            height: "75px",
            borderRadius: "50%",
            border: "2px solid blue",
            marginLeft: "20px",
            cursor: "pointer",
          }}
        />
      </>
    );
  };

  const handleAvatar = (avatarSelected) => {
    setAvatarIndex(avatarSelected);
  };

  const handleModalOpen = () => setOpen(true);

  const handleLoginSuccess = (name, avatar, id) => {
    const avatarUrl = handleAvatar(avatar);
    getAllEmployees(id)
    
    setUserDataAvatar(avatarUrl);

    setUserDataName(name);
    setLoggedIn(true);
    setOpen(false);
  };

  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateModalOpen = () => setOpenCreateModal(true);

  const handleCreateUsers = (dataUs, dataAv, dataId) => {
    setUserDataName(dataUs);
    setUserDataAvatar(dataAv);
    handleLoginSuccess(dataUs, dataAv, dataId );
    setLoggedIn(true);
    setOpenCreateModal(false);
   
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDownloadList = async () => {
    try {
      const response = await getEmployeeFileList();

      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1].trim()
        : "employee-list.csv";
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });

      saveAs(blob, fileName);
      console.log("lista descargada");
    } catch (error) {
      console.error("Error al descargar la lista de empleados:", error);
    }
    handleCloseMenu();
  };

  const handleMenuMessage = () => {
    return (
      <Paper sx={{ padding: "30px", marginTop: "100px" }}>
        <Typography>
          Registrate para descargar una lista de empleados
        </Typography>
        <Button>Volver</Button>
      </Paper>
    );
  };

  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              onClick={loggedIn ? handleClickMenu : handleMenuMessage}
              sx={{
                color: "#ffffff",
                position: "relative",

                "&::after": {
                  content: loggedIn ? "'Menu'" : "'Debes registrarte'",
                  display: "none",
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#1976D2",
                  color: "#ffffff",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                  transition: "opacity 1s",
                },
                "&:hover::after": {
                  display: "block",
                  opacity: "2s",
                  height: "30px",
                  fontSize: "15px",
                  marginLeft: "50px",
                },
              }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              style={{ top: "50px" }}
            >
              <MenuItem
                onClick={handleDownloadList}
                style={{ padding: "10px" }}
              >
                <DownloadTwoToneIcon />
                Descargar lista de empleados
              </MenuItem>
            </Menu>

            <Link to="/about">
              <IconButton
                size="large"
                sx={{
                  color: "#ffffff",
                  position: "relative",

                  "&::after": {
                    content: "'Más información'",
                    display: "none",
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#1976D2",
                    color: "#ffffff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    transition: "opacity 1s",
                  },
                  "&:hover::after": {
                    display: "block",
                    opacity: "2s",
                    height: "30px",
                    fontSize: "15px",
                  },
                }}
                aria-label="menu"
              >
                <InfoIcon></InfoIcon>
              </IconButton>
            </Link>
            <IconButton
              size="large"
              sx={{
                color: "#ffffff",
                position: "relative",

                "&::after": {
                  content: "'Déjame un mensaje'",
                  display: "none",
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#1976D2",
                  color: "#ffffff",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                  transition: "opacity 1s",
                },
                "&:hover::after": {
                  display: "block",
                  opacity: "2s",
                  height: "30px",
                  fontSize: "15px",
                },
              }}
              aria-label="menu"
            >
              <AddCommentIcon></AddCommentIcon>
            </IconButton>

            <Link
              to="https://www.linkedin.com/in/luis-c-92499795/"
              target="_blank"
            >
              <IconButton
                size="large"
                sx={{
                  color: "#ffffff",
                  position: "relative",

                  "&::after": {
                    content: "'Linkedyn'",
                    display: "none",
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#1976D2",
                    color: "#ffffff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    transition: "opacity 1s",
                  },
                  "&:hover::after": {
                    display: "block",
                    opacity: "2s",
                    height: "30px",
                    fontSize: "15px",
                  },
                }}
                aria-label="menu"
              >
                <ContactMailIcon></ContactMailIcon>
              </IconButton>
            </Link>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tabla de Registro, Edición y Eliminación de empleados
            </Typography>

            {loggedIn ? (
              <Typography
                variant="h6"
                sx={{
                  color: "#ffffff",
                  "&::after": {
                    content: "'Perfil'",
                    display: "none",
                    position: "absolute",
                    top: "100%",
                    left: "97%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#1976D2",
                    color: "#ffffff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    transition: "opacity 1s",
                  },
                  "&:hover::after": {
                    display: "block",
                    opacity: "2s",
                    height: "30px",
                    fontSize: "15px",
                  },
                }}
              >
                ¡Bienvenido, {userDataName}!
                <ImageRendering
                  src={Avatars[avatarIndex]}
                  anchorEl={anchorElMenu}
                  onClick={handleAccountProfileClick}
                ></ImageRendering>
                <AccountMenu
                  anchorEl={anchorElMenu}
                  onClose={handleCloseProfile}
                  avatar={Avatars}
                  avatarIndex={setAvatarIndex}
                  avatarData={Avatars[avatarIndex]}
                ></AccountMenu>
              </Typography>
            ) : (
              <Box>
                <Button color="inherit" onClick={handleCreateModalOpen}>
                  <Typography sx={{ color: "#ffffff" }}>
                    Crear Usuario
                  </Typography>
                </Button>
                <Modal
                  open={openCreateModal}
                  onClose={handleCloseCreateModal}
                  aria-labelledby="modal-modal-create-user"
                  aria-describedby="modal-modal-user-data"
                >
                 
                  <CreateUsers
                    onClose={handleCloseCreateModal}
                    onSuccess={handleCreateUsers}
                  ></CreateUsers>
                  
                </Modal>

                <Button color="inherit" onClick={handleModalOpen}>
                  <Typography sx={{ color: "#ffffff" }}>Login</Typography>
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Login
                    onClose={handleClose}
                    onSuccess={handleLoginSuccess}
                  ></Login>
                </Modal>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Fragment>
  );
};
export default Header;
