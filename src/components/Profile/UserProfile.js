import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfileRequest, updateProfileRequest } from "./userSlice";
import { Skeleton } from "antd";
import Navigation from "../../components/Navigation";

const drawerWidth = 240;

export default function UserProfile() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Profile");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    profilePicture: null,
    userType: "",
    preferredContactMethod: "",
    receiveNewsletter: false,
  });

  const [fileName, setFileName] = useState("");

  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const { user, error, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfileRequest());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({ ...prevFormData, ...user }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        profilePicture: reader.result,
      }));
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateProfileRequest(formData));
  };

  const getFormStyle = () => ({
    m: 3,
    p: 2,
    ...(user?.userType === "buyer" && {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }),
  });

  const getLogoStyle = () => ({
    m: user?.userType === "buyer" ? 2 : 1,
    bgcolor: "secondary.main",
  });

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...(user?.userType === "buyer" && { justifyContent: "center" }),
      }}
    >
      {isAuthenticated && token && user && user.userType === "buyer" && (
        <Navigation />
      )}

      {isLoading ? (
        <div>
          <Skeleton.Button block active className="mt-2" />
          <Skeleton.Button block active className="mt-2" />
          <Skeleton.Button block active className="mt-2" />
          <Skeleton.Button block active className="mt-2" />
          <Skeleton.Button block active className="mt-2" />
          <Skeleton.Button block active className="mt-2" />
          <Skeleton.Button block active className="mt-2" />
          <Skeleton.Button block active className="mt-2" />
          <Skeleton.Button block active className="mt-2" />
          <Skeleton.Button block active className="mt-2" />
          <Skeleton.Button block active className="mt-2" />
        </div>
      ) : (
        <>
          <Avatar sx={getLogoStyle()}>
            {formData.firstname.charAt(0).toUpperCase()}
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={getFormStyle()}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lastname"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="New Password (leave blank to keep current)"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  name="state"
                  label="State"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  name="zipCode"
                  label="ZIP Code"
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  {...getRootProps()}
                  sx={{
                    border: "2px dashed #f07917",
                    padding: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <Typography>Drop the image here...</Typography>
                  ) : (
                    <Typography>
                      Drag 'n' drop an image here, or click to select an image
                    </Typography>
                  )}
                  {formData.profilePicture && (
                    <Box mt={2} sx={{ textAlign: "center" }}>
                      <img
                        src={formData.profilePicture}
                        alt="Profile Preview"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography>{fileName}</Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="User Type"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="agent">Agent</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Preferred Contact Method"
                  name="preferredContactMethod"
                  value={formData.preferredContactMethod}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.receiveNewsletter}
                      onChange={handleChange}
                      name="receiveNewsletter"
                    />
                  }
                  label="I want to receive the newsletter"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#f07917" }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Update Profile"
              )}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
