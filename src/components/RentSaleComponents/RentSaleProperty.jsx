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
  Tooltip,
} from "@mui/material";
import ImageGallerySlider from "../ImageGallerySlider";
import { orange } from "@mui/material/colors";
import PropertyIcons from "../PropertyIcons";
import RentalForm from "./RentalForm";
import Itour from "./Itour";
import ReviewForm from "./ReviewForm.js";
import { Info as InfoIcon, Add as AddIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

function RentSaleProperty(props) {
  const { isAuthenticated, error, loading, token } = useSelector(
    (state) => state.auth
  );

  const { user } = useSelector((state) => state.user);

  const [imagesForDisplay, setImagesForDisplay] = useState([]);

  const [open, setOpen] = useState(false);
  const [openRentalForm, setOpenRentalForm] = useState(false);
  const [newReview, setNewReview] = useState({
    user_name: "",
    review: "",
    suggestion: "",
    propertyId: props.propertyId,
  });

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewReview({
      user_name: "",
      review: "",
      suggestion: "",
      propertyId: props.propertyId,
    });
  };

  // Ensure the propertyId is updated if the prop changes
  useEffect(() => {
    setNewReview((prevState) => ({
      ...prevState,
      propertyId: props.propertyId,
    }));
  }, [props.propertyId]);

  const handleOpenRentalForm = () => {
    setOpenRentalForm(true);
  };

  const handleCloseRentalForm = () => {
    setOpenRentalForm(false);
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

            {/* <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpen}
              sx={{ marginBottom: 2 }}
            >
              Add Review
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenRentalForm}
            >
              Rent This Property
            </Button> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Tooltip
                title={
                  !isAuthenticated
                    ? "You have to Login first to Add Review!"
                    : ""
                }
                arrow
                placement="bottom"
              >
                <div>
                  <Button
                    variant="contained"
                    color="warning"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                    sx={{ marginRight: 2 }}
                    disabled={!isAuthenticated}
                    style={{
                      pointerEvents: !isAuthenticated ? "none" : "auto",
                    }}
                  >
                    Add Review
                  </Button>
                </div>
              </Tooltip>
              <Tooltip
                title={
                  !isAuthenticated
                    ? "You have to Login first to Rent this Property!"
                    : ""
                }
                arrow
                placement="bottom"
              >
                <div>
                  <Button
                    variant="contained"
                    color="warning"
                    size="large"
                    onClick={handleOpenRentalForm}
                    disabled={!isAuthenticated}
                    style={{
                      pointerEvents: !isAuthenticated ? "none" : "auto",
                    }}
                  >
                    Rent This Property
                  </Button>
                </div>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <div
          style={{ borderBottom: "1px dashed #bdbdbd" }}
          className="my-3"
        ></div>
        {props.tourId && (
          <Itour tourId={props.tourId} filename={"index.html"} />
        )}
      </Container>
      <ReviewForm
        open={open}
        handleClose={handleClose}
        propertyId={props.propertyId}
        newReview={newReview}
        setNewReview={setNewReview}
      />
      <RentalForm
        open={openRentalForm}
        handleClose={handleCloseRentalForm}
        propertyId={props.propertyId}
      />
    </Box>
  );
}

export default RentSaleProperty;
