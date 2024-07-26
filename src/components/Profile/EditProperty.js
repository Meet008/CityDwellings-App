import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
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
    city: "",
    state: "",
    postalCode: "",
    listingType: "apartments",
    category: "rent",
    price: 70,
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    parking: false,
    area: 0,
    yearBuilt: 2000,
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
        city: propertyDetails.city || "",
        state: propertyDetails.state || "",
        postalCode: propertyDetails.postalCode || "",
        listingType: propertyDetails.listingType || "",
        category: propertyDetails.category || "",
        price: propertyDetails.price || 0,
        bedrooms: propertyDetails.bedrooms || 0,
        bathrooms: propertyDetails.bathrooms || 0,
        furnished: propertyDetails.furnished || false,
        parking: propertyDetails.parking || false,
        area: propertyDetails.area || 0,
        yearBuilt: propertyDetails.yearBuilt || 0,
        images: [], // Reset for new images
        existingImages: propertyDetails.images || [], // Store existing images
        removedImages: [], // Reset removed images
      });

      // if (propertyDetails.images && Array.isArray(propertyDetails.images)) {
      //   const imageUrls = propertyDetails.images.map((imagePath) => {
      //     const encodedFilename = encodeURIComponent(
      //       imagePath.split("/").pop()
      //     );
      //     return `${process.env.REACT_APP_UPLOAD_URL}/${encodedFilename}`;
      //   });
      //   setImagesForDisplay(imageUrls);
      // }
      if (propertyDetails.images && Array.isArray(propertyDetails.images)) {
        setImagesForDisplay(propertyDetails.images);
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
    const decodedPath = decodeURIComponent(imageUrl.split("/").pop());

    setImagesForDisplay((prevImages) =>
      prevImages.filter((image) => image !== imageUrl)
    );

    const removedImage = formData.existingImages.find(
      (img) => decodeURIComponent(img.split("/").pop()) === decodedPath
    );

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
    for (const key in formData) {
      if (key === "images") {
        formData.images.forEach((image) =>
          propertyData.append("images", image)
        );
      } else if (key === "removedImages") {
        propertyData.append(
          "removedImages",
          JSON.stringify(formData.removedImages)
        );
      } else {
        propertyData.append(key, formData[key]);
      }
    }

    try {
      await dispatch(
        editPropertyRequest({ propertyId, formData: propertyData, navigate })
      );
    } catch (error) {}
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          {propertyDetails.status === "sold"
            ? "View Property"
            : "Edit Property"}
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
              disabled={propertyDetails.status === "sold"}
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
              disabled={propertyDetails.status === "sold"}
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
              disabled={propertyDetails.status === "sold"}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              variant="outlined"
              required
              disabled={propertyDetails.status === "sold"}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              variant="outlined"
              required
              disabled={propertyDetails.status === "sold"}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              variant="outlined"
              required
              disabled={propertyDetails.status === "sold"}
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
                      disabled={propertyDetails.status === "sold"}
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
              disabled={propertyDetails.status === "sold"}
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
              disabled={propertyDetails.status === "sold"}
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
              disabled={propertyDetails.status === "sold"}
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
              disabled={propertyDetails.status === "sold"}
            />
          </Box>
          <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Area (sq ft)"
              name="area"
              type="number"
              value={formData.area}
              onChange={handleChange}
              variant="outlined"
              required
              sx={{ flexGrow: 1, mr: 2 }}
              disabled={propertyDetails.status === "sold"}
            />
            <TextField
              label="Year Built"
              name="yearBuilt"
              type="number"
              value={formData.yearBuilt}
              onChange={handleChange}
              variant="outlined"
              required
              sx={{ flexGrow: 1 }}
              disabled={propertyDetails.status === "sold"}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.furnished}
                  onChange={handleChange}
                  name="furnished"
                  disabled={propertyDetails.status === "sold"}
                />
              }
              label="Furnished"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.parking}
                  onChange={handleChange}
                  name="parking"
                  disabled={propertyDetails.status === "sold"}
                />
              }
              label="Parking"
            />
          </Box>
          <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
            <TextField
              select
              label="Listing Type"
              name="listingType"
              value={formData.listingType}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              variant="outlined"
              required
              sx={{ flexGrow: 1, mr: 2 }}
              disabled={propertyDetails.status === "sold"}
            >
              <option value="houses">Houses</option>
              <option value="apartments">Apartments</option>
              <option value="land">offices</option>
            </TextField>
            <TextField
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              variant="outlined"
              required
              sx={{ flexGrow: 1 }}
              disabled={propertyDetails.status === "sold"}
            >
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading || propertyDetails.status === "sold"}
            >
              {isLoading ? <CircularProgress size={24} /> : "Update Property"}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
