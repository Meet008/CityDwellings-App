import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { addPropertyRequest } from "./userSlice";

export default function AddProperty() {
  const fileRef = useRef(null);

  const { isLoading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imagesForDisplay, setImagesForDisplay] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    listingType: "apartments",
    category: "rent",
    price: 70,
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    parking: false,
    images: [],
  });

  const handleChange = (e) => {
    const { name, checked, value, files } = e.target;
    if (name === "images") {
      const selectedImages = Array.from(files);
      setFormData({ ...formData, [name]: selectedImages });
      const imagePreviews = selectedImages.map((image) =>
        URL.createObjectURL(image)
      );
      setImagesForDisplay(imagePreviews);
    } else {
      setFormData({
        ...formData,
        [name]: name === "parking" || name === "furnished" ? checked : value,
      });
    }
  };

  const handleAddProperty = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.address ||
      !formData.price
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const propertyData = new FormData();
    for (const key in formData) {
      if (key === "images") {
        formData[key].forEach((image) => {
          propertyData.append("images", image);
        });
      } else {
        propertyData.append(key, formData[key]);
      }
    }
    propertyData.append("ownerId", user._id);

    dispatch(addPropertyRequest({ formData: propertyData, navigate }));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Add Property
        </Typography>
        <form onSubmit={handleAddProperty}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <input
              hidden
              type="file"
              ref={fileRef}
              name="images"
              onChange={handleChange}
              multiple
            />
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mt: 2,
              }}
            >
              {imagesForDisplay.map((image, index) => (
                <Box key={index} sx={{ width: 100 }}>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 4,
                    }}
                  />
                </Box>
              ))}
            </Box>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => fileRef.current.click()}
              sx={{ mt: 1 }}
            >
              Select Images
            </Button>
          </Box>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Type</InputLabel>
              <Select
                name="listingType"
                value={formData.listingType}
                onChange={handleChange}
                label="Type"
              >
                <MenuItem value="houses">Houses</MenuItem>
                <MenuItem value="apartments">Apartments</MenuItem>
                <MenuItem value="offices">Offices</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                label="Category"
              >
                <MenuItem value="rent">Rent</MenuItem>
                <MenuItem value="sale">Sale</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              variant="outlined"
              required
              sx={{ flex: 1, mr: 2 }}
            />

            <TextField
              label="Bedrooms"
              name="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={handleChange}
              variant="outlined"
              required
              sx={{ flex: 1, mr: 2 }}
            />

            <TextField
              label="Bathrooms"
              name="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={handleChange}
              variant="outlined"
              required
              sx={{ flex: 1 }}
            />
          </Box>
          <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="furnished"
                  checked={formData.furnished}
                  onChange={handleChange}
                />
              }
              label="Furnished"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="parking"
                  checked={formData.parking}
                  onChange={handleChange}
                />
              }
              label="Parking"
            />
          </Box>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size="1rem" /> : null}
            >
              {isLoading ? "Loading..." : "Add Property"}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
