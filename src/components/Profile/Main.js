// Main.js
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchProfileRequest } from "./userSlice";

const MemoizedSidebar = React.memo(Sidebar);

const drawerWidth = 240;

const Main = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = React.useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfileRequest());
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: "#f07917" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            User Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <MemoizedSidebar
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          mt: 8,
        }}
      >
        <Container component="main" maxWidth="md">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Main;
