import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  Typography,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info"; // Import the icon from Material Icons
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    boxShadow: theme.shadows[5],
  },
}));

const Notify = () => {
  const [seconds, setSeconds] = useState(15);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(interval);
          setOpen(false); // Close the dialog
          localStorage.setItem("visited", "true");
          navigate("/");
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <StyledDialog
      open={open}
      onClose={() => {}}
      fullWidth
      maxWidth="sm"
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust transparency here
        },
      }}
    >
      <DialogContent
        style={{
          backgroundColor: "white", // Set background to white for contrast
          borderRadius: "16px",
          padding: "24px",
          textAlign: "center", // Center text alignment
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <InfoIcon
            style={{
              fontSize: 60,
              color: "#f07917", // Orange color for the icon
              marginBottom: 16,
            }}
          />
          <Typography
            variant="h6"
            gutterBottom
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 500,
              fontSize: "1.25rem", // Adjusted font size for a professional look
              lineHeight: "1.5rem", // Set line height for better readability
              marginBottom: 16,
            }}
          >
            Please wait while we prepare the website...
          </Typography>
          <Typography
            variant="body2"
            style={{ fontFamily: "Roboto, sans-serif", color: "#555" }}
          >
            Starting in {seconds} seconds
          </Typography>
          <CircularProgress
            size={60}
            sx={{ mt: 2 }}
            style={{ color: "#f07917" }} // Orange color
          />
          <Divider sx={{ my: 2 }} />
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};

export default Notify;
