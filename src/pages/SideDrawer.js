// src/components/Sidebar.js
import React, { useState, useEffect } from "react";
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
  Box,
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

const Sidebar = (props) => {
  const drawerWidth = 240;

  const { open } = props;



  const [profile, setProfile] = useState({
    name: "",
    email: "",
    job: "",
    education: "",
    pet: "",
    homeStyle: "",
    language: "",
    color: "",
  });

  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingProperty, setIsAddingProperty] = useState(false);

  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    setNewProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleAddProperty = () => {
    setProperties((prevProperties) => [...prevProperties, newProperty]);
    setNewProperty({ title: "", description: "", price: "" });
    setIsAddingProperty(false);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    console.log("Profile Updated:", profile);
  };

  return (
    open && (
      <Box
        sx={{
          flex: "0 0 25%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-testid="PersonIcon"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </Avatar>

        <Typography variant="body2" sx={{ mt: 2 }}>
          No bio yet!
        </Typography>

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
      </Box>
    )
  );
};

export default Sidebar;
