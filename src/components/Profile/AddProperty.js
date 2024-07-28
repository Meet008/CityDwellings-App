import React, { useState, useRef, useEffect } from "react";
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
  FormHelperText,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { addPropertyRequest } from "./userSlice";
import { faker } from "@faker-js/faker";
import api from "../../api";

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
    hasTour: false,
    tourFile: null,
    tourId: null,
    tourFileName: "",
  };
};

const generateFakePayment = () => {
  return {
    cardNumber: faker.finance.creditCardNumber(),
    expirationDate: `${faker.datatype
      .number({ min: 1, max: 12 })
      .toString()
      .padStart(2, "0")}/${faker.datatype.number({ min: 22, max: 30 })}`,
    cvv: faker.finance.creditCardCVV(),
  };
};

const AddProperty = () => {
  const fileRef = useRef(null);
  const tourFileRef = useRef(null);
  const { isLoading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imagesForDisplay, setImagesForDisplay] = useState([]);

  const [formValues, setFormValues] = useState(generateFakeData());

  const [formErrors, setFormErrors] = useState({});
  const [cardDetails, setCardDetails] = useState(generateFakePayment());
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [fileError, setFileError] = useState("");

  const [tourLoading, setTourLoading] = useState(false);
  useEffect(() => {
    if (formValues.hasTour && !formValues.tourFileName) {
      setFileError("Please upload a tour file.");
    } else {
      setFileError("");
    }
  }, [formValues.hasTour, formValues.tourFileName]);

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

  const handleTourFileChange = (e) => {
    const tourFile = e.target.files[0];
    setFormValues((prevValues) => ({
      ...prevValues,
      tourFile: tourFile,
      tourFileName: tourFile ? tourFile.name : "",
    }));
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
    if (fileError !== "") errors = "has Error";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadTour = async (tourFile) => {
    setTourLoading(true);
    const tourData = new FormData();

    tourData.append("name", tourFile.name);
    tourData.append("description", formValues.title);
    tourData.append("tourFile", tourFile);

    try {
      const res = await api.post("tours/tours", tourData);
      return res.data._id; // Use the returned data to get the tour ID
    } catch (err) {
      throw new Error("Failed to upload tour");
    }
  };

  const handleSubmit = async (e) => {
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

    try {
      let tourId = null;
      if (formValues.hasTour && formValues.tourFile) {
        tourId = await uploadTour(formValues.tourFile);
      }
      setTourLoading(false);
      const propertyData = new FormData();
      for (const key in formValues) {
        if (key === "images") {
          formValues[key].forEach((image) => {
            propertyData.append("images", image);
          });
        } else if (key !== "tourFile" && key !== "tourId") {
          propertyData.append(key, formValues[key]);
        }
      }

      if (tourId) {
        propertyData.append("tourId", tourId);
      }

      propertyData.append("ownerId", user._id);

      dispatch(addPropertyRequest({ formData: propertyData, navigate }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentConfirmation = () => {
    if (
      !cardDetails.cardNumber ||
      !cardDetails.expirationDate ||
      !cardDetails.cvv
    ) {
      toast.error("Please fill in all card details");
      return;
    }

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
                <Box key={index} sx={{ position: "relative", width: 100 }}>
                  <img
                    src={image}
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
                    onClick={() => handleRemoveImage(index)}
                  >
                    &times;
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
          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues.hasTour}
                  onChange={handleChange}
                  name="hasTour"
                />
              }
              label="Include a tour file"
            />
            {formValues.hasTour && (
              <Button
                variant="contained"
                component="label"
                color="primary"
                sx={{ mt: 1 }}
              >
                Upload Tour File
                <input
                  type="file"
                  hidden
                  ref={tourFileRef}
                  accept=".zip,.rar,.7z"
                  onChange={handleTourFileChange}
                />
              </Button>
            )}
            {fileError && <FormHelperText error>{fileError}</FormHelperText>}
            {formValues.hasTour && formValues.tourFileName && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Uploaded Tour File:</Typography>
                <Typography variant="body1">
                  {formValues.tourFileName}
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                isLoading ||
                tourLoading ||
                (formValues.hasTour && formValues.tourFileName === "")
              }
            >
              {isLoading || tourLoading ? (
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
        <DialogTitle>Payment Confirmation</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Card Number"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleCardDetailsChange}
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Expiration Date (MM/YY)"
              name="expirationDate"
              value={cardDetails.expirationDate}
              onChange={handleCardDetailsChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="CVV"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleCardDetailsChange}
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handlePaymentConfirmation}
            variant="contained"
            color="primary"
          >
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddProperty;
