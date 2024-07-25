import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  setFormData,
  submitFormRequest,
  submitFormSuccess,
  clearForm,
  editFormRequest,
} from "./RentalFormSlice"; // Adjust the import path as necessary

const dummyData = {
  full_name: "John Doe",
  phone_number: "123-456-7890",
  email: "johndoe@example.com",
  date_of_birth: "1990-01-01",
  driver_license_number: "D1234567",
  current_address: "123 Main St, Springfield, IL",
  previous_addresses: [
    {
      address: "456 Elm St, Springfield, IL",
      landlord_name: "Jane Smith",
      landlord_contact: "098-765-4321",
      duration_of_residence: "2 years",
      reason_for_leaving: "Moved to a bigger place",
    },
  ],
  previous_employers: [
    {
      employer_name: "ABC Corp",
      employer_contact: "111-222-3333",
      position: "Software Engineer",
      duration_of_employment: "3 years",
      monthly_income: "$5000",
    },
  ],

  emergency_contact: {
    name: "Mary Doe",
    relationship: "Sister",
    phone_number: "987-654-3210",
  },

  authorization_and_consent: {
    signature: "John Doe",
    date: "2024-07-16",
    consent_for_checks: true,
  },
  minimum_stay: "6 months",
};

const RentalForm = ({ open, handleClose, propertyId, initialData }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.rentalForm.formData);
  const isLoading = useSelector((state) => state.rentalForm.isLoading);
  const submissionSuccess = useSelector(
    (state) => state.rentalForm.submissionSuccess
  );

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChangeFormData = (key, value) => {
    const keys = key.split(".");
    let updatedFormData = { ...formData };

    let currentLevel = updatedFormData;
    for (let i = 0; i < keys.length - 1; i++) {
      currentLevel[keys[i]] = currentLevel[keys[i]]
        ? { ...currentLevel[keys[i]] }
        : {};
      currentLevel = currentLevel[keys[i]];
    }

    currentLevel[keys[keys.length - 1]] = value;

    dispatch(setFormData(updatedFormData));
  };

  const handleArrayChange = (arrayKey, index, fieldKey, value) => {
    const newArray = formData[arrayKey]
      ? formData[arrayKey].map((item) => ({ ...item }))
      : [];
    if (!newArray[index]) {
      newArray[index] = {};
    }
    newArray[index][fieldKey] = value;
    handleChangeFormData(arrayKey, newArray);
  };
  const handleSubmit = async (event) => {
    // Dispatch the form submission request action
    event.preventDefault();
    initialData
      ? dispatch(editFormRequest({ propertyId, formData }))
      : dispatch(submitFormRequest({ propertyId, formData }));
  };

  useEffect(() => {
    if (submissionSuccess) {
      dispatch(clearForm());
      handleClose();
    }
  }, [submissionSuccess, handleClose, dispatch]);

  useEffect(() => {
    if (initialData) {
      const formattedData = {
        ...initialData,
        date_of_birth: initialData.date_of_birth
          ? new Date(initialData.date_of_birth).toISOString().split("T")[0]
          : "",
      };
      dispatch(setFormData(formattedData)); // Set the form data with initial data
    } else {
      dispatch(setFormData(dummyData));
    }
  }, [dispatch, initialData]);
  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
      <DialogTitle
        sx={{ fontSize: "22px", color: "#ff700d", textAlign: "center" }}
      >
        Rental Application
      </DialogTitle>
      <DialogContent>
        <label
          style={{
            fontSize: "18px",
            color: "#ff700d",
            borderBottom: "1px dashed #f07917",
            display: "block",
          }}
        >
          Personal Information
        </label>
        <Box mt={2}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChangeFormData("full_name", e.target.value)}
            value={formData?.full_name || ""}
            sx={{ mb: 2 }}
          />
          <Box display="flex" gap={2}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              onChange={(e) =>
                handleChangeFormData("phone_number", e.target.value)
              }
              value={formData?.phone_number || ""}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => handleChangeFormData("email", e.target.value)}
              value={formData?.email || ""}
            />
          </Box>
          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("date_of_birth", e.target.value)
            }
            value={formData?.date_of_birth || ""}
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField
            label="Driver License Number"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("driver_license_number", e.target.value)
            }
            value={formData?.driver_license_number || ""}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Minimum Stay</InputLabel>
            <Select
              value={formData?.minimum_stay || ""}
              onChange={(e) =>
                handleChangeFormData("minimum_stay", e.target.value)
              }
            >
              <MenuItem value="6 months">6 months</MenuItem>
              <MenuItem value="1 year">1 year</MenuItem>
              <MenuItem value="more than 1 year">More than 1 year</MenuItem>
            </Select>
          </FormControl>
          <label
            style={{
              fontSize: "18px",
              color: "#ff700d",
              borderBottom: "1px dashed #f07917",
              display: "block",
            }}
          >
            Residential History
          </label>
          <TextField
            label="Current Address"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("current_address", e.target.value)
            }
            value={formData?.current_address || ""}
            sx={{ mb: 2 }}
          />
          {formData?.previous_addresses?.map((address, index) => (
            <Box key={index} mt={2}>
              <TextField
                label="Previous Address"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  handleArrayChange(
                    "previous_addresses",
                    index,
                    "address",
                    e.target.value
                  )
                }
                value={address.address || ""}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Landlord Name"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  handleArrayChange(
                    "previous_addresses",
                    index,
                    "landlord_name",
                    e.target.value
                  )
                }
                value={address.landlord_name || ""}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Landlord Contact"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  handleArrayChange(
                    "previous_addresses",
                    index,
                    "landlord_contact",
                    e.target.value
                  )
                }
                value={address.landlord_contact || ""}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Duration of Residence"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  handleArrayChange(
                    "previous_addresses",
                    index,
                    "duration_of_residence",
                    e.target.value
                  )
                }
                value={address.duration_of_residence || ""}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Reason for Leaving"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  handleArrayChange(
                    "previous_addresses",
                    index,
                    "reason_for_leaving",
                    e.target.value
                  )
                }
                value={address.reason_for_leaving || ""}
                sx={{ mb: 2 }}
              />
            </Box>
          ))}

          <label
            style={{
              fontSize: "18px",
              color: "#ff700d",
              borderBottom: "1px dashed #f07917",
              display: "block",
            }}
          >
            Additional Information
          </label>
          {formData?.previous_employers?.map((employer, index) => (
            <Box key={index} mt={2}>
              <TextField
                label="Previous Employer"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  handleArrayChange(
                    "previous_employers",
                    index,
                    "employer_name",
                    e.target.value
                  )
                }
                value={employer.employer_name || ""}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Employer Contact"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  handleArrayChange(
                    "previous_employers",
                    index,
                    "employer_contact",
                    e.target.value
                  )
                }
                value={employer.employer_contact || ""}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Position"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  handleArrayChange(
                    "previous_employers",
                    index,
                    "position",
                    e.target.value
                  )
                }
                value={employer.position || ""}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Duration of Employment"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  handleArrayChange(
                    "previous_employers",
                    index,
                    "duration_of_employment",
                    e.target.value
                  )
                }
                value={employer.duration_of_employment || ""}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Monthly Income"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  handleArrayChange(
                    "previous_employers",
                    index,
                    "monthly_income",
                    e.target.value
                  )
                }
                value={employer.monthly_income || ""}
                sx={{ mb: 2 }}
              />
            </Box>
          ))}

          <label
            style={{
              fontSize: "18px",
              color: "#ff700d",
              borderBottom: "1px dashed #f07917",
              display: "block",
            }}
          >
            Emergency Contact
          </label>
          <TextField
            label="Emergency Contact Name"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("emergency_contact.name", e.target.value)
            }
            value={formData?.emergency_contact?.name || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Relationship"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData(
                "emergency_contact.relationship",
                e.target.value
              )
            }
            value={formData?.emergency_contact?.relationship || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData(
                "emergency_contact.phone_number",
                e.target.value
              )
            }
            value={formData?.emergency_contact?.phone_number || ""}
            sx={{ mb: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : initialData ? "Edit" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RentalForm;
