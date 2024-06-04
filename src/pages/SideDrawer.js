// src/components/Sidebar.js
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Container,
  Grid,
  ListItemAvatar,
  TextField,
  Typography,
} from "@mui/material";
import {
  Language,
  Place,
  Phone,
  Mail,
  AccessTime,
  Add,
} from "@mui/icons-material";
import { AccountBox, Home, ExitToApp } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      {/* <List>
        <ListItem button component={Link} to="/profile">
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
        <ListItem button component={Link} to="/listings">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Listings" />
        </ListItem>
        <ListItem button component={Link} to="/logout">
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List> */}

      <List>
        <ListItem>
          <ListItemAvatar>
            <Language />
          </ListItemAvatar>
          <ListItemText primary="N/A" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Place />
          </ListItemAvatar>
          <ListItemText primary="N/A" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <AccessTime />
          </ListItemAvatar>
          <ListItemText primary="N/A" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
