import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import ImageGallerySlider from "../ImageGallerySlider";
import { orange } from "@mui/material/colors";
import PropertyIcons from "../PropertyIcons";
import RentalForm from "./RentalForm";
import Itour from "./Itour";

function RentSaleProperty(props) {
  const [imagesForDisplay, setImagesForDisplay] = useState([]);

  useEffect(() => {
    if (props.propertyImages && Array.isArray(props.propertyImages)) {
      const imageUrls = props.propertyImages.map((imagePath) => {
        const encodedFilename = encodeURIComponent(imagePath.split("/").pop());
        return `http://localhost:5000/uploads/${encodedFilename}`;
      });
      setImagesForDisplay(imageUrls);
    }
  }, [props.propertyImages]);

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
          </Box>
        </Box>
        <div
          style={{ borderBottom: "1px dashed #bdbdbd" }}
          className="my-3"
        ></div>
        <Itour tourId={props.tourId} filename={"index.html"} />
        <RentalForm />
      </Container>
    </Box>
  );
}

export default RentSaleProperty;
