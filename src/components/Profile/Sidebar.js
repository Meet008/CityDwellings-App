import AddBoxIcon from "@mui/icons-material/AddBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PersonIcon from "@mui/icons-material/Person";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Logout from "../Auth/Logout";

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const drawer = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: "Dashboard", icon: <DashboardIcon />, path: "dashboard" },
          { text: "Add Property", icon: <AddBoxIcon />, path: "add-property" },
          // { text: "Message", icon: <MessageIcon />, path: "message" },
          {
            text: "My Properties",
            icon: <HomeWorkIcon />,
            path: "my-properties",
          },
          // {
          //   text: "My Favorites",
          //   icon: <FavoriteIcon />,
          //   path: "my-favorites",
          // },
          { text: "Reviews", icon: <RateReviewIcon />, path: "reviews" },
          { text: "Profile", icon: <PersonIcon />, path: "userProfile" },
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
          </ListItem>
        ))}
        <Logout onClick={handleDrawerToggle} />
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
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
