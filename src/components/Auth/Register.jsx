import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Badge,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { faker } from "@faker-js/faker";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        CityDwellings
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const steps = [
  "Personal Information",
  "Contact Information",
  "Other Details",
  // "Chat Support Information",
];

function getStepContent(
  stepIndex,
  formData,
  handleChange,
  handleFileChange,
  fileName,
  handleRemoveImage
) {
  switch (stepIndex) {
    case 0:
      return (
        <>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
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
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="family-name"
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
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
        </>
      );
    case 1:
      return (
        <>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="phone"
              label="Phone Number"
              id="phone"
              autoComplete="tel"
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
              autoComplete="street-address"
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
              autoComplete="address-level2"
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
              autoComplete="address-level1"
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
              autoComplete="postal-code"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </Grid>
        </>
      );
    case 2:
      return (
        <>
          {formData.profilePicture && (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                badgeContent={
                  <IconButton
                    size="small"
                    onClick={handleRemoveImage}
                    sx={{
                      color: "white",
                      backgroundColor: "red",
                      "&:hover": {
                        backgroundColor: "darkred",
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
              >
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
              </Badge>
              <Typography sx={{ mt: 1 }}>{fileName}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button variant="contained" component="label" fullWidth>
              Upload Profile Picture
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>User Type</InputLabel>
              <Select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <MenuItem value="buyer">Buyer</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
                <MenuItem value="agent">Agent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Preferred Contact Method</InputLabel>
              <Select
                name="preferredContactMethod"
                value={formData.preferredContactMethod}
                onChange={handleChange}
              >
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="phone">Phone</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="receiveNewsletter"
                  checked={formData.receiveNewsletter}
                  onChange={handleChange}
                />
              }
              label="Subscribe to Newsletter"
            />
          </Grid>
        </>
      );
    // case 3:
    //   return (
    //     <>
    //       <Grid item xs={12}>
    //         <Typography variant="body2" color="textSecondary" gutterBottom>
    //           <InfoOutlinedIcon
    //             fontSize="small"
    //             sx={{ verticalAlign: "middle", mr: 1 }}
    //           />
    //           If you do not want to add chat support, please leave the fields
    //           empty.
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={12}>
    //         <TextField
    //           fullWidth
    //           name="propertyId"
    //           label="Property ID"
    //           id="propertyId"
    //           value={formData.propertyId}
    //           onChange={handleChange}
    //           helperText="Enter the ID associated with the property you want to list."
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <TextField
    //           fullWidth
    //           name="widgetId"
    //           label="Widget ID (Chat Support)"
    //           id="widgetId"
    //           value={formData.widgetId}
    //           onChange={handleChange}
    //           helperText={
    //             <>
    //               Enter the Widget ID provided by your chat support service.
    //               <br />
    //               This ID is necessary to link the chat support widget to your
    //               account.
    //             </>
    //           }
    //         />
    //       </Grid>
    //     </>
    //   );
    default:
      return "Unknown stepIndex";
  }
}

export default function SignUp() {
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
    // propertyId: "", // New state for Property ID
    // widgetId: "", // New state for Widget ID
  });

  const [activeStep, setActiveStep] = useState(0);
  const [fileName, setFileName] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isAuthenticated, error, token } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated && token && user && user.userType === "seller") {
      navigate("/profile/dashboard");
    }
    if (isAuthenticated && token && user && user.userType === "buyer") {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, profilePicture: reader.result });
    };
    reader.readAsDataURL(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleRemoveImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: null,
    }));
    setFileName("");
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (activeStep === steps.length - 1) {
      dispatch(registerRequest(formData));
    } else {
      handleNext();
    }
  };

  // Function to generate fake user data
  const generateFakeUser = () => {
    return {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      profilePicture: faker.image.avatar(),
      userType: faker.helpers.arrayElement(["buyer", "seller", "agent"]),
      preferredContactMethod: faker.helpers.arrayElement(["email", "phone"]),
      receiveNewsletter: faker.datatype.boolean(),
    };
  };

  // Function to handle generating and submitting fake users
  const handleGenerateAndSubmitFakeUsers = async (numUsers) => {
    for (let i = 0; i < numUsers; i++) {
      const fakeUser = generateFakeUser();
      try {
        await dispatch(registerRequest(fakeUser));
      } catch (error) {
        console.error(`Error adding fake user ${i + 1}:`, error);
      }
    }
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Stepper activeStep={activeStep} sx={{ mt: 3, mb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {getStepContent(
                activeStep,
                formData,
                handleChange,
                handleFileChange,
                fileName,
                handleRemoveImage
              )}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                {activeStep === steps.length - 1 ? "Sign Up" : "Next"}
              </Button>
            </Box>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            {activeStep === steps.length - 1 && (
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            )}
          </Box>
          {/* {activeStep === steps.length - 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Need help with your Chat account setup?{" "}
                <Link
                  href="https://help.tawk.to/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Tawk.to Help Center
                </Link>
              </Typography>
            </Box>
          )} */}
          {/* <Button
            variant="contained"
            color="primary"
            onClick={() => handleGenerateAndSubmitFakeUsers(10)}
            sx={{ mt: 3 }}
          >
            Generate and Submit 10 Fake Users
          </Button> */}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
