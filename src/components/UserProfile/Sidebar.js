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
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MessageIcon from "@mui/icons-material/Message";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 240;

const Sidebar = ({ isMobile, mobileOpen, handleDrawerToggle }) => {
  const drawer = (
    <div>
      <Toolbar />

      <Divider />
      <List>
        {[
          "Dashboard",
          "Add Property",
          "Message",
          "My Properties",
          "My Favorites",
          "Reviews",
          "Profile",
          "Signout",
        ].map((text, index) => {
          const icons = [
            <DashboardIcon />,
            <AddBoxIcon />,
            <MessageIcon />,
            <HomeWorkIcon />,
            <FavoriteIcon />,
            <RateReviewIcon />,
            <PersonIcon />,
            <ExitToAppIcon />,
          ];
          return (
            <ListItem button key={text}>
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
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
          color: "#333",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
