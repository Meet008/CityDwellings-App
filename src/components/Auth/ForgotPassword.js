import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Box,
  Link,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  forgotPasswordRequest,
  updatePasswordRequest,
  updatePasswordSuccess,
} from "./authSlice";

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, forgotPasswordSuccess, updatePasswordSuccess } =
    useSelector((state) => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(forgotPasswordRequest({ email }));
  };

  const handlePasswordUpdate = (event) => {
    event.preventDefault();
    dispatch(updatePasswordRequest({ email, newPassword }));
  };

  // Redirect to login page after successful password update
  React.useEffect(() => {
    if (updatePasswordSuccess) {
      navigate("/login");
    }
  }, [updatePasswordSuccess, navigate]);

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
            Forgot Password
          </Typography>
          {!forgotPasswordSuccess && (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              {loading && <Typography>Loading...</Typography>}
            </Box>
          )}
          {forgotPasswordSuccess && user && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">User Details</Typography>
              <Typography>Name: {user.name}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>Contact: {user.contact}</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handlePasswordUpdate}
              >
                Update Password
              </Button>
            </Box>
          )}
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Back to Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
