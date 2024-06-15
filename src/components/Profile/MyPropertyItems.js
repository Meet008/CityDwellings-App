import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropertyIcons from "../PropertyIcons";

function MyPropertyItems({
  itemURL,
  itemId,
  itemTitle,
  itemAddress,
  itemPrice,
  itemShortDescription,
  itemBedrooms,
  itemBathrooms,
  itemLivingrooms,
  itemImg,
  handleEditProperty,
  handleDeleteProperty,
}) {
  let encodedImgUrl = null;
  if (itemImg) {
    const encodedFilename = encodeURIComponent(itemImg.split("/").pop());
    encodedImgUrl = `http://localhost:5000/uploads/${encodedFilename}`;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        marginTop: "2rem",
        marginBottom: "3rem",
        padding: "1rem",
      }}
    >
      <Box sx={{ width: { xs: "100%", md: "50%" } }}>
        <Link
          to={`/${itemURL}property/${itemId}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: "bold",
              color: "black",
              textTransform: "capitalize",
            }}
          >
            {itemTitle}
          </Typography>
        </Link>
        <Typography
          variant="h6"
          sx={{
            textTransform: "uppercase",
            marginTop: "0.3rem",
          }}
        >
          {itemAddress}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textTransform: "uppercase",
            color: orange[500],
            marginTop: "0.5rem",
          }}
        >
          £{itemPrice} per month
        </Typography>
        <Typography variant="body1" sx={{ marginY: "1rem" }}>
          {itemShortDescription}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <PropertyIcons
            bedrooms={itemBedrooms}
            bathrooms={itemBathrooms}
            livingrooms={itemLivingrooms}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to={`/${itemURL}property/${itemId}`}>
            <Button variant="contained" color="warning" size="large">
              Full Details
            </Button>
          </Link>
          <Box>
            <IconButton
              color="primary"
              onClick={() => handleEditProperty(itemId)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleDeleteProperty(itemId)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          marginBottom: { xs: "2rem", md: "0" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          to={`/${itemURL}property/${itemId}`}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card sx={{ maxWidth: "90%" }}>
            {encodedImgUrl ? (
              <CardMedia
                component="img"
                height="200"
                image={encodedImgUrl}
                alt="Property image"
              />
            ) : (
              <CardContent>
                <Typography variant="body1">No Image Available</Typography>
              </CardContent>
            )}
          </Card>
        </Link>
      </Box>
    </Box>
    //   <Divider />
  );
}

export default MyPropertyItems;
