import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Badge,
  Stack,
  Chip,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropertyIcons from "../PropertyIcons";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MailIcon from "@mui/icons-material/Mail"; // For applications icon

const MyPropertyItems = ({
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
  expiryDate,
  handleShowApplications,
  applicationCount,
}) => {
  let encodedImgUrl = null;
  if (itemImg) {
    const encodedFilename = encodeURIComponent(itemImg.split("/").pop());
    encodedImgUrl = `http://localhost:5000/uploads/${encodedFilename}`;
  }

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  };

  const getStatusColor = (date) => {
    const currentDate = new Date();
    const expiry = new Date(date);
    const diffTime = expiry - currentDate;

    if (diffTime < 0) return "grey"; // Expired
    if (diffTime <= 3 * 24 * 60 * 60 * 1000) return "#FF1D1D"; // Less than 3 days in milliseconds
    if (diffTime <= 15 * 24 * 60 * 60 * 1000) return "#e0d210"; // Less than 15 days in milliseconds
    return "green"; // More than 15 days
  };

  const expiryColor = getStatusColor(expiryDate);

  const isExpired = new Date(expiryDate) < new Date();

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // catch 11th, 12th, 13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const suffix = getOrdinalSuffix(day);
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return formattedDate.replace(day, `${day}${suffix}`);
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        margin: "2rem 0",
        padding: "1rem",
        boxShadow: 3,
        borderRadius: 2,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
        }}
      >
        <Chip
          icon={<AccessTimeIcon />}
          label={
            isExpired ? "Expired" : `Valid Until: ${formatDate(expiryDate)}`
          }
          sx={{
            backgroundColor: expiryColor,
            color: "white",
            fontWeight: "bold",
            "& .MuiChip-icon": {
              color: "white",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Link
          to={`/${itemURL}property/${itemId}`}
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <CardMedia
            component="img"
            height="200"
            image={encodedImgUrl}
            alt="Property image"
            sx={{
              borderRadius: 2,
              width: "100%",
              objectFit: "cover",
              maxHeight: { xs: "300px", md: "100%" },
            }}
          />
        </Link> */}

        <Link
          to={`/${itemURL}property/${itemId}`}
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          {encodedImgUrl ? (
            <CardMedia
              component="img"
              height="200"
              image={encodedImgUrl}
              alt="Property image"
              sx={{
                borderRadius: 2,
                width: "90%",
                objectFit: "cover",
                maxHeight: { xs: "300px", md: "100%" },
              }}
            />
          ) : (
            <CardContent>
              <Typography variant="body1">No Image Available</Typography>
            </CardContent>
          )}
        </Link>
      </Box>
      <CardContent
        sx={{
          width: { xs: "100%", md: "50%" },
          padding: { xs: "1rem", md: "2rem" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: "25px",
        }}
      >
        <Box>
          <Link
            to={`/${itemURL}property/${itemId}`}
            style={{ textDecoration: "none" }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                textTransform: "capitalize",
              }}
            >
              {itemTitle}
            </Typography>
          </Link>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ textTransform: "uppercase", marginTop: "0.3rem" }}
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
            ${itemPrice} per month
          </Typography>
          <Tooltip title={itemShortDescription} arrow>
            <Typography variant="body1" sx={{ marginY: "1rem" }}>
              {truncateText(itemShortDescription, 100)}
            </Typography>
          </Tooltip>
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
              Applications
            </Button>
          </Link>

          <Box>
            {/* <Badge badgeContent={applicationCount} color="primary">
              <IconButton
                color="warning"
                onClick={() => handleShowApplications(itemId)}
              >
                <MailIcon />
              </IconButton>
            </Badge> */}
            <IconButton
              color="warning"
              onClick={() => handleEditProperty(itemId)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="warning"
              onClick={() => handleDeleteProperty(itemId)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MyPropertyItems;
