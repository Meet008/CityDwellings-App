import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MessageIcon from "@mui/icons-material/Message";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Logout from "../Auth/Logout";

const drawerWidth = 240;

const Sidebar = ({ isMobile, mobileOpen, handleDrawerToggle }) => {
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: "Dashboard", icon: <DashboardIcon />, path: "dashboard" },
          { text: "Add Property", icon: <AddBoxIcon />, path: "add-property" },
          { text: "Message", icon: <MessageIcon />, path: "message" },
          {
            text: "My Properties",
            icon: <HomeWorkIcon />,
            path: "my-properties",
          },
          {
            text: "My Favorites",
            icon: <FavoriteIcon />,
            path: "my-favorites",
          },
          { text: "Reviews", icon: <RateReviewIcon />, path: "reviews" },
          { text: "Profile", icon: <PersonIcon />, path: "userProfile" },
          { text: "Signout", icon: <ExitToAppIcon />, path: "/" },
        ].map(({ text, icon, path }) => (
          <ListItem
            button
            component={Link}
            to={path}
            key={text}
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
            {path === "signout" && <Logout />}
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          backgroundColor: "#f5f5f5",
          color: "#f07917",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
