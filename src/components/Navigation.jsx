// import React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import MenuItem from "@mui/material/MenuItem";
// import logo from "../assets/icons/buildings.svg";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { orange } from "@mui/material/colors";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// function Navigation() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const darkTheme = createTheme({
//     palette: {
//       mode: "dark",
//       primary: {
//         main: "#1976d2",
//       },
//     },
//     typography: {
//       fontFamily: ["Montserrat", "sans-serif"].join(","),
//     },
//   });

//   const { isAuthenticated, error, loading, token } = useSelector(
//     (state) => state.auth
//   );

//   const pages = isAuthenticated
//     ? ["sale", "rent", "about", "contact", "profile"]
//     : ["sale", "rent", "about", "contact", "login"];

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <AppBar
//         sx={{
//           position: "relative",
//           backgroundColor: orange[800],
//           boxShadow: "none",
//         }}
//       >
//         <Container maxWidth="xl">
//           <Toolbar disableGutters>
//             <Link to="/" style={{ textDecoration: "none" }}>
//               <Box sx={{ display: "flex" }}>
//                 <Box
//                   sx={{
//                     display: { xs: "none", md: "flex" },
//                     marginRight: "5px",
//                   }}
//                 >
//                   <img src={logo} alt="logo" />
//                 </Box>
//                 <Typography
//                   variant="h6"
//                   noWrap
//                   sx={{
//                     mr: 2,
//                     display: { xs: "none", md: "flex" },
//                     fontWeight: 700,
//                     letterSpacing: ".1rem",
//                     color: "white",
//                     textDecoration: "none",
//                   }}
//                 >
//                   City Dwellings
//                 </Typography>
//               </Box>
//             </Link>

//             <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//               <IconButton
//                 size="large"
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleOpenNavMenu}
//                 color="inherit"
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorElNav}
//                 anchorOrigin={{
//                   vertical: "bottom",
//                   horizontal: "left",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "left",
//                 }}
//                 open={Boolean(anchorElNav)}
//                 onClose={handleCloseNavMenu}
//                 sx={{
//                   display: { xs: "block", md: "none" },
//                 }}
//               >
//                 <MenuItem>
//                   <Link
//                     to="/"
//                     style={{
//                       textAlign: "center",
//                       color: "white",
//                       textDecoration: "none",
//                       textTransform: "uppercase",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Home
//                   </Link>
//                 </MenuItem>

//                 {pages.map((page) => (
//                   <MenuItem key={page} onClick={handleCloseNavMenu}>
//                     <Link
//                       to={`/${page}`}
//                       style={{
//                         textAlign: "center",
//                         color: "white",
//                         textDecoration: "none",
//                         textTransform: "uppercase",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {page}
//                     </Link>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>

//             <Link
//               to="/"
//               style={{
//                 textDecoration: "none",

//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <Box
//                 sx={{
//                   display: { xs: "flex", md: "none" },
//                   justifyContent: "center",
//                   width: "100%",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: { xs: "flex", md: "none" },
//                     marginRight: "5px",
//                   }}
//                 >
//                   <img src={logo} alt="logo" />
//                 </Box>
//                 <Box>
//                   <Typography
//                     variant="h5"
//                     noWrap
//                     sx={{
//                       mr: 2,
//                       display: { xs: "flex", md: "none" },
//                       flexGrow: 1,
//                       fontWeight: 700,
//                       letterSpacing: ".1rem",
//                       color: "white",
//                       textDecoration: "none",
//                     }}
//                   >
//                     City Dwellings
//                   </Typography>
//                 </Box>
//               </Box>
//             </Link>
//             <Box
//               sx={{
//                 flexGrow: 1,
//                 display: { xs: "none", md: "flex" },
//                 justifyContent: "end",
//                 alignItems: "center",
//               }}
//             >
//               <Link
//                 to="/"
//                 style={{
//                   color: "white",
//                   fontWeight: "bold",
//                   textTransform: "uppercase",
//                   textDecoration: "none",
//                 }}
//               >
//                 Home
//               </Link>

//               {pages.map((page) => (
//                 <Link
//                   key={page}
//                   onClick={handleCloseNavMenu}
//                   to={`/${page}`}
//                   style={{
//                     color: "white",
//                     fontWeight: "bold",
//                     textTransform: "uppercase",
//                     marginLeft: "8px",
//                     textDecoration: "none",
//                   }}
//                 >
//                   {page}
//                 </Link>
//               ))}
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>
//     </ThemeProvider>
//   );
// }

// export default Navigation;

// src/components/Navigation.js
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

  // const pages = isAuthenticated
  //   ? ["sale", "rent", "about", "contact", "profile"]
  //   : ["sale", "rent", "about", "contact", "login"];

  const pages = ["sale", "rent", "about", "contact", "login"];

  const ConditionalLink = ({ page }) => {
    const linkTo = page === "profile" ? "/profile/dashboard" : `/${page}`;

    return (
      <Link
        to={linkTo}
        style={{
          color: "white",
          fontWeight: "bold",
          textTransform: "uppercase",
          marginLeft: "8px",
          textDecoration: "none",
          borderBottom:
            location?.pathname === `/${page}`
              ? "2px solid #fff"
              : "2px solid #f07917",
        }}
      >
        {page === "profile" ? "Profile" : page}
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
                    fontWeight: 700,
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
                      marginLeft: "8px",
                      textDecoration: "none",
                    }}
                  >
                    Home
                  </Link>
                </MenuItem>

                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <ConditionalLink page={page} />
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
                      fontWeight: 700,
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
                  marginLeft: "8px",
                  textDecoration: "none",
                  borderBottom:
                    location?.pathname === "/"
                      ? "2px solid #fff"
                      : "2px solid #f07917",
                }}
              >
                Home
              </Link>

              {pages.map((page) => (
                <Link
                  key={page}
                  onClick={handleCloseNavMenu}
                  to={`/${page}`}
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    marginLeft: "8px",
                    textDecoration: "none",
                  }}
                >
                  {page}
                </Link>
              ))}
              {isAuthenticated && <Logout />}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navigation;
