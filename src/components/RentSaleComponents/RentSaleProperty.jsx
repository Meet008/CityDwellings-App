import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import ImageGallerySlider from "../ImageGallerySlider";
import { orange } from "@mui/material/colors";
import PropertyIcons from "../PropertyIcons";
import RentalForm from "./RentalForm";
import Itour from "./Itour";

import { useLocation } from "react-router-dom";

function RentSaleProperty(props) {
  const [imagesForDisplay, setImagesForDisplay] = useState([]);
  const location = useLocation();

  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [userName, setUserName] = useState("");
  const [userFeedback, setUserFeedback] = useState("");
  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    if (props.propertyImages && Array.isArray(props.propertyImages)) {
      const imageUrls = props.propertyImages.map((imagePath) => {
        const encodedFilename = encodeURIComponent(imagePath.split("/").pop());
        return `http://localhost:5000/uploads/${encodedFilename}`;
      });
      setImagesForDisplay(imageUrls);
    }
    return () => {};
  }, [props.propertyImages]);

  const handleOpenReviewDialog = () => {
    setOpenReviewDialog(true);
  };

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false);
  };

  const handleReviewSubmit = () => {
    // Handle review submission logic here
    // For example, send reviewText to backend or display it somewhere
    console.log("Submitting review:", reviewText);
    setOpenReviewDialog(false);
    // Optionally, you can update state or perform other actions after submission
  };

  return (
    <Box>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            marginY: "2rem",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "60%" },
            }}
          >
            <ImageGallerySlider images={imagesForDisplay} imageHeight="400px" />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              paddingLeft: { xs: 0, md: "2rem" },
              marginTop: { xs: "2rem", md: 0 },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: "1.4em",
                fontWeight: "bold",
              }}
            >
              {props.propertyAddress}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.2em",
                textTransform: "uppercase",
                color: orange[500],
                marginTop: "0.5rem",
              }}
            >
              ${props.propertyPrice} per month
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginY: "1rem",
              }}
            >
              {props.propertyLongDescription}
            </Typography>
            <PropertyIcons
              bedrooms={props.propertyBedrooms}
              bathrooms={props.propertyBathrooms}
              livingrooms={props.propertyLivingrooms}
            />
            <Button
              variant="outlined"
              onClick={handleOpenReviewDialog}
              sx={{ marginTop: "1rem" }}
            >
              Share Your Review
            </Button>
            <Dialog open={openReviewDialog} onClose={handleCloseReviewDialog}>
              <DialogTitle>Share Your Review</DialogTitle>
              <DialogContent>
                <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Feedback"
                      variant="outlined"
                      value={userFeedback}
                      onChange={(e) => setUserFeedback(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Comment"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseReviewDialog} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleReviewSubmit}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
        <div
          style={{ borderBottom: "1px dashed #bdbdbd" }}
          className="my-3"
        ></div>
        {props.tourId && (
          <Itour tourId={props.tourId} filename={"index.html"} />
        )}

        <RentalForm />
      </Container>
    </Box>
  );
}

export default RentSaleProperty;
