import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import { Language, Place, AccessTime, Add } from "@mui/icons-material";

import SideDrawer from "./SideDrawer";

const Profile = () => {
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

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

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
    <Container maxWidth="md">
      <Box sx={{ display: "flex", mt: 2 }}>
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
          <Button
            variant="outlined"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
          >
            {isEditingProfile ? "Cancel" : "Edit Profile"}
          </Button>
          {isEditingProfile && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveProfile}
              sx={{ mt: 2 }}
            >
              Save Changes
            </Button>
          )}
          <Typography variant="body2" sx={{ mt: 2 }}>
            No bio yet!
          </Typography>

          <SideDrawer />
        </Box>
        <Box ox sx={{ flex: "1", ml: 2 }}>
          <Typography variant="h6">My Information</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {Object.keys(profile).map((key) => (
              <TextField
                key={key}
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={profile[key]}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                placeholder={`Enter your ${key}`}
                sx={{ flex: "1 0 45%" }}
              />
            ))}
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">My Properties</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsAddingProperty(true)}
              sx={{ mb: 2 }}
            >
              Add Property
              <Add />
            </Button>
            {properties.map((property, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h5">{property.title}</Typography>
                  <Typography variant="body2">
                    {property.description}
                  </Typography>
                  <Typography variant="subtitle1">
                    Price: ${property.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="outlined">Edit</Button>
                  <Button variant="contained" color="secondary">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
            {properties.length === 0 && (
              <Typography variant="body1">No properties yet!</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
