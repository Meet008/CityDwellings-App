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

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", mt: 2 }}>
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
          {/* <Box sx={{ mt: 4 }}>
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
          </Box> */}
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
