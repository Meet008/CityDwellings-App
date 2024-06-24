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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { addPropertyRequest } from "./userSlice";

import { faker } from "@faker-js/faker";

const generateFakeData = () => {
  return {
    title: `${faker.address.streetName()} ${faker.address.streetSuffix()}`,
    description: faker.lorem.paragraphs(2),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    postalCode: faker.address.zipCode(),
    listingType: faker.helpers.arrayElement([
      "houses",
      "apartments",
      "offices",
    ]),
    category: faker.helpers.arrayElement(["rent", "sale"]),
    price: faker.datatype.number({ min: 50000, max: 1000000 }),
    bedrooms: faker.datatype.number({ min: 1, max: 10 }),
    bathrooms: faker.datatype.number({ min: 1, max: 5 }),
    furnished: faker.datatype.boolean(),
    parking: faker.datatype.boolean(),
    area: faker.datatype.number({ min: 500, max: 5000 }),
    yearBuilt: faker.datatype.number({
      min: 1900,
      max: new Date().getFullYear(),
    }),
    images: [], // This will remain empty as we are not generating fake images here
  };
};
const AddProperty = () => {
  const fileRef = useRef(null);
  const { isLoading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imagesForDisplay, setImagesForDisplay] = useState([]);
  // const [formValues, setFormValues] = useState({
  //   title: "",
  //   description: "",
  //   address: "",
  //   city: "",
  //   state: "",
  //   postalCode: "",
  //   listingType: "apartments",
  //   category: "rent",
  //   price: 70,
  //   bedrooms: 1,
  //   bathrooms: 1,
  //   furnished: false,
  //   parking: false,
  //   area: 50,
  //   yearBuilt: 2020,
  //   images: [],
  // });

  const [formValues, setFormValues] = useState(generateFakeData());

  const [formErrors, setFormErrors] = useState({});
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    const selectedImages = Array.from(files);
    setFormValues((prevValues) => ({
      ...prevValues,
      images: selectedImages,
    }));
    const imagePreviews = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );
    setImagesForDisplay(imagePreviews);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = imagesForDisplay.filter((_, i) => i !== index);
    const updatedFormImages = formValues.images.filter((_, i) => i !== index);
    setImagesForDisplay(updatedImages);
    setFormValues((prevValues) => ({
      ...prevValues,
      images: updatedFormImages,
    }));
  };

  const validate = () => {
    let errors = {};
    if (!formValues.title) errors.title = "Title is required";
    if (!formValues.description) errors.description = "Description is required";
    if (!formValues.address) errors.address = "Address is required";
    if (!formValues.city) errors.city = "City is required";
    if (!formValues.state) errors.state = "State is required";
    if (!formValues.postalCode) errors.postalCode = "Postal Code is required";
    if (!formValues.price || formValues.price <= 0)
      errors.price = "Price must be positive";
    if (!formValues.bedrooms || formValues.bedrooms <= 0)
      errors.bedrooms = "Bedrooms must be positive";
    if (!formValues.bathrooms || formValues.bathrooms <= 0)
      errors.bathrooms = "Bathrooms must be positive";
    if (!formValues.area || formValues.area <= 0)
      errors.area = "Area must be positive";
    if (
      !formValues.yearBuilt ||
      formValues.yearBuilt <= 0 ||
      !Number.isInteger(Number(formValues.yearBuilt))
    )
      errors.yearBuilt = "Year Built must be a positive integer";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user._id) {
      toast.error("User not authenticated");
      return;
    }

    if (!paymentConfirmed) {
      setPaymentDialogOpen(true);
      return;
    }

    if (!validate()) return;

    const propertyData = new FormData();
    for (const key in formValues) {
      if (key === "images") {
        formValues[key].forEach((image) => {
          propertyData.append("images", image);
        });
      } else {
        propertyData.append(key, formValues[key]);
      }
    }

    propertyData.append("ownerId", user._id);

    dispatch(addPropertyRequest({ formData: propertyData, navigate }));
  };

  const handlePaymentConfirmation = () => {
    setPaymentConfirmed(true);
    setPaymentDialogOpen(false);
    toast.success("Payment confirmed. You can now add your property.");
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Add Property
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              error={Boolean(formErrors.title)}
              helperText={formErrors.title}
              variant="outlined"
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              error={Boolean(formErrors.description)}
              helperText={formErrors.description}
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
              value={formValues.address}
              onChange={handleChange}
              error={Boolean(formErrors.address)}
              helperText={formErrors.address}
              variant="outlined"
              required
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formValues.city}
              onChange={handleChange}
              error={Boolean(formErrors.city)}
              helperText={formErrors.city}
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formValues.state}
              onChange={handleChange}
              error={Boolean(formErrors.state)}
              helperText={formErrors.state}
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={formValues.postalCode}
              onChange={handleChange}
              error={Boolean(formErrors.postalCode)}
              helperText={formErrors.postalCode}
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
              onChange={handleImageChange}
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
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: 100,
                    borderRadius: 1,
                    overflow: "hidden",
                    border: "1px solid #ccc",
                  }}
                >
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "inherit",
                    }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      minWidth: "auto",
                      padding: 4,
                      backgroundColor: "rgba(255,255,255,0.8)",
                    }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <CloseIcon />
                  </Button>
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
                value={formValues.listingType}
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
                value={formValues.category}
                onChange={handleChange}
                label="Category"
              >
                <MenuItem value="rent">Rent</MenuItem>
                <MenuItem value="sale">Sale</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formValues.price}
              onChange={handleChange}
              error={Boolean(formErrors.price)}
              helperText={formErrors.price}
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Bedrooms"
              name="bedrooms"
              type="number"
              value={formValues.bedrooms}
              onChange={handleChange}
              error={Boolean(formErrors.bedrooms)}
              helperText={formErrors.bedrooms}
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Bathrooms"
              name="bathrooms"
              type="number"
              value={formValues.bathrooms}
              onChange={handleChange}
              error={Boolean(formErrors.bathrooms)}
              helperText={formErrors.bathrooms}
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Area (sq meters)"
              name="area"
              type="number"
              value={formValues.area}
              onChange={handleChange}
              error={Boolean(formErrors.area)}
              helperText={formErrors.area}
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Year Built"
              name="yearBuilt"
              type="number"
              value={formValues.yearBuilt}
              onChange={handleChange}
              error={Boolean(formErrors.yearBuilt)}
              helperText={formErrors.yearBuilt}
              variant="outlined"
              required
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="furnished"
                  checked={formValues.furnished}
                  onChange={handleChange}
                />
              }
              label="Furnished"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="parking"
                  checked={formValues.parking}
                  onChange={handleChange}
                />
              }
              label="Parking"
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </form>
      </Box>

      <Dialog
        open={paymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
      >
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Do you confirm the payment of $70?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handlePaymentConfirmation}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddProperty;
