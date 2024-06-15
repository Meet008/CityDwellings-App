import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import { fetchPropertyDetailsRequest, editPropertyRequest } from "./userSlice";

export default function EditProperty() {
  const fileRef = useRef(null);
  const { propertyId } = useParams();
  const { isLoading, propertyDetails } = useSelector((state) => state.user);
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
    images: [], // New images to be uploaded
    existingImages: [], // Existing images URLs
    removedImages: [], // Images to be removed
  });

  useEffect(() => {
    dispatch(fetchPropertyDetailsRequest({ propertyId }));
  }, [dispatch, propertyId]);

  useEffect(() => {
    if (propertyDetails) {
      setFormData({
        title: propertyDetails.title || "",
        description: propertyDetails.description || "",
        address: propertyDetails.address || "",
        listingType: propertyDetails.listingType || "",
        category: propertyDetails.category || "",
        price: propertyDetails.price || "",
        bedrooms: propertyDetails.bedrooms || "",
        bathrooms: propertyDetails.bathrooms || "",
        furnished: propertyDetails.furnished || false,
        parking: propertyDetails.parking || false,
        images: [], // Reset for new images
        existingImages: propertyDetails.images || [], // Store existing images
        removedImages: [], // Reset removed images
      });

      // Construct image URLs based on the paths received from API
      if (propertyDetails.images && Array.isArray(propertyDetails.images)) {
        const imageUrls = propertyDetails.images.map((imagePath) => {
          const encodedFilename = encodeURIComponent(
            imagePath.split("/").pop()
          );
          return `http://localhost:5000/uploads/${encodedFilename}`;
        });
        setImagesForDisplay(imageUrls);
      }
    }
  }, [propertyDetails]);

  const handleChange = (e) => {
    const { name, checked, value, files } = e.target;
    if (name === "images") {
      const selectedImages = Array.from(files);
      const imagePreviews = selectedImages.map((image) =>
        URL.createObjectURL(image)
      );
      setImagesForDisplay((prevImages) => [...prevImages, ...imagePreviews]);
      setFormData({
        ...formData,
        images: [...formData.images, ...selectedImages],
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === "parking" || name === "furnished" ? checked : value,
      });
    }
  };

  const handleRemoveImage = (imageUrl) => {
    console.log("Image URL:", imageUrl);

    // Decode the image path
    const decodedPath = decodeURIComponent(imageUrl.split("/").pop());
    console.log("Decoded Path:", decodedPath);

    // Remove the image from display
    setImagesForDisplay((prevImages) =>
      prevImages.filter((image) => image !== imageUrl)
    );

    // Find removed image in existingImages
    const removedImage = formData.existingImages.find(
      (img) => decodeURIComponent(img.split("/").pop()) === decodedPath
    );
    console.log("Removed Image:", removedImage);

    // Add the removed image path to removedImages array
    if (removedImage) {
      setFormData({
        ...formData,
        removedImages: [...formData.removedImages, removedImage],
      });
    }
  };

  const handleEditProperty = async (e) => {
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
    propertyData.append("title", formData.title);
    propertyData.append("description", formData.description);
    propertyData.append("address", formData.address);
    propertyData.append("listingType", formData.listingType);
    propertyData.append("category", formData.category);
    propertyData.append("price", formData.price);
    propertyData.append("bedrooms", formData.bedrooms);
    propertyData.append("bathrooms", formData.bathrooms);
    propertyData.append("furnished", formData.furnished);
    propertyData.append("parking", formData.parking);

    // Append new images
    formData.images.forEach((image) => {
      propertyData.append("images", image);
    });

    // Convert removedImages array to JSON string before appending
    propertyData.append(
      "removedImages",
      JSON.stringify(formData.removedImages)
    );

    try {
      await dispatch(
        editPropertyRequest({ propertyId, formData: propertyData, navigate })
      );
      toast.success("Property updated successfully");
      navigate(`/property/${propertyId}`);
    } catch (error) {
      toast.error("Failed to update property");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Edit Property
        </Typography>
        <form onSubmit={handleEditProperty}>
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
              {imagesForDisplay && imagesForDisplay.length > 0 ? (
                imagesForDisplay.map((imageUrl, index) => (
                  <Box key={index} sx={{ position: "relative", width: 100 }}>
                    <img
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 4,
                      }}
                    />
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        borderRadius: "50%",
                        minWidth: "auto",
                        width: 24,
                        height: 24,
                        padding: 0,
                      }}
                      onClick={() => handleRemoveImage(imageUrl)}
                    >
                      &times;
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography>No images uploaded</Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => fileRef.current.click()}
            >
              Upload Images
            </Button>
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
              sx={{ flexGrow: 1, mr: 2 }}
            />
            <TextField
              label="Bedrooms"
              name="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={handleChange}
              variant="outlined"
              required
              sx={{ flexGrow: 1, mr: 2 }}
            />
            <TextField
              label="Bathrooms"
              name="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={handleChange}
              variant="outlined"
              required
              sx={{ flexGrow: 1 }}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
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
          <Box sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Update Property"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
