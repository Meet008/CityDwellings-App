import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/icons/buildings.svg";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import Logout from "./Auth/Logout";
import ArrowBack from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import SellIcon from "@mui/icons-material/Sell";
import RentIcon from "@mui/icons-material/House";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
  });

  const pages = isAuthenticated
    ? [
        { name: "sale", icon: <SellIcon /> },
        { name: "rent", icon: <RentIcon /> },
        { name: "about", icon: <InfoIcon /> },
        { name: "contact", icon: <ContactMailIcon /> },
        { name: "profile", icon: <AccountCircleIcon /> },
      ]
    : [
        { name: "sale", icon: <SellIcon sx={{ marginRight: 1 }} /> },
        { name: "rent", icon: <RentIcon sx={{ marginRight: 1 }} /> },
        { name: "about", icon: <InfoIcon sx={{ marginRight: 1 }} /> },
        { name: "contact", icon: <ContactMailIcon sx={{ marginRight: 1 }} /> },
        { name: "login", icon: <LoginIcon sx={{ marginRight: 1 }} /> },
      ];

  const ConditionalLink = ({ page }) => {
    const linkTo =
      page.name === "profile" ? "/profile/dashboard" : `/${page.name}`;

    return (
      <Link
        to={linkTo}
        style={{
          color: "white",
          textDecoration: "none",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {page.icon}
        <Typography variant="caption">{page.name}</Typography>
      </Link>
    );
  };

  const shouldShowBackButton = () => {
    const pathsWithoutBackButton = ["/", "/profile/dashboard"];
    return !pathsWithoutBackButton.includes(location.pathname);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        sx={{
          position: "relative",
          backgroundColor: orange[800],
          boxShadow: "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {shouldShowBackButton() && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="back"
                onClick={handleBack}
                sx={{ marginRight: 2 }}
              >
                <ArrowBack />
              </IconButton>
            )}
            <Link to="/" style={{ textDecoration: "none" }}>
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    marginRight: "5px",
                  }}
                >
                  <img src={logo} alt="logo" />
                </Box>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontWeight: "bold",
                    letterSpacing: ".1rem",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  City Dwellings
                </Typography>
              </Box>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem>
                  <Link
                    to="/"
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <HomeIcon sx={{ marginRight: 1 }} />
                    <Typography variant="">Home</Typography>
                  </Link>
                </MenuItem>
                {/* <ConditionalLink page={page} /> */}
                {pages.map((page) => (
                  <MenuItem>
                    <Link
                      key={page.name}
                      onClick={handleCloseNavMenu}
                      to={`/${page.name}`}
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {page.icon}
                      <Typography variant="">{page.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
                {isAuthenticated && (
                  <MenuItem>
                    <Logout />
                  </MenuItem>
                )}
              </Menu>
            </Box>

            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: { xs: "flex", md: "none" },
                    marginRight: "5px",
                  }}
                >
                  <img src={logo} alt="logo" />
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    noWrap
                    sx={{
                      mr: 2,
                      display: { xs: "flex", md: "none" },
                      flexGrow: 1,
                      fontWeight: "bold",
                      letterSpacing: ".1rem",
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    City Dwellings
                  </Typography>
                </Box>
              </Box>
            </Link>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Link
                to="/"
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginLeft: "16px",
                }}
              >
                <HomeIcon />
                <Typography variant="">Home</Typography>
              </Link>

              {pages.map((page) => (
                <Link
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  to={`/${page.name}`}
                  style={{
                    color: "white",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    textAlign: "center",
                    display: "flex",
                    fontWeight: "bold",
                    flexDirection: "column",
                    alignItems: "center",
                    marginLeft: "16px",
                  }}
                >
                  {page.icon}
                  <Typography variant="">{page.name}</Typography>
                </Link>
              ))}
              {isAuthenticated && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginLeft: "16px",
                  }}
                >
                  <Logout />
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navigation;
