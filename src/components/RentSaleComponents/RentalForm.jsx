import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Select } from "antd";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  submitFormRequest,
  submitFormSuccess,
  submitFormFailure,
} from "./RentalFormSlice"; // Update the import path as necessary

const RentalForm = (props) => {
  const { open, handleClose, propertyId } = props;
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.rentalForm.formData);
  const isLoading = useSelector((state) => state.rentalForm.isLoading);
  const submissionSuccess = useSelector(
    (state) => state.rentalForm.submissionSuccess
  );
  const error = useSelector((state) => state.rentalForm.error);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChangeFormData = (key, value) => {
    dispatch(setFormData({ [key]: value }));
  };

  const handleSubmit = () => {
    dispatch(submitFormRequest({ propertyId, formData }));
  };

  // Close the dialog if the form is successfully submitted
  if (submissionSuccess) {
    handleClose();
    dispatch(submitFormSuccess());
  }

  useEffect(() => {
    // Set dummy data when the component mounts
    const dummyData = {
      full_name: "John Doe",
      phone_number: "1234567890",
      email: "john.doe@example.com",
      current_address: "123 Current St, City, Country",
      previous_addresses: "456 Previous St, City, Country",
      bank_account_name: "John Doe",
      account_type: "saving",
      ifsc_code: "IFSC0001",
      reason_for_moving: "Relocation for work",
    };
    dispatch(setFormData(dummyData));
  }, [dispatch]);

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
      <DialogTitle
        sx={{ fontSize: "22px", color: "#ff700d", textAlign: "center" }}
      >
        Rental Application
      </DialogTitle>
      <DialogContent>
        <Box mt={2}>
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
              size="large"
              onChange={(e) => {
                handleChangeFormData("full_name", e.target.value);
              }}
              value={formData?.full_name}
              sx={{ mb: 2 }}
            />
            <Box display="flex" gap={2}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                size="large"
                onChange={(e) => {
                  handleChangeFormData("phone_number", e.target.value);
                }}
                value={formData?.phone_number}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                size="large"
                onChange={(e) => {
                  handleChangeFormData("email", e.target.value);
                }}
                value={formData?.email}
              />
            </Box>
          </Box>
          <Box mt={3}>
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
            <Box mt={2}>
              <TextField
                label="Current Address"
                variant="outlined"
                fullWidth
                size="large"
                onChange={(e) => {
                  handleChangeFormData("curerent_address", e.target.value);
                }}
                value={formData?.current_address}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Previous Addresses"
                variant="outlined"
                fullWidth
                size="large"
                onChange={(e) => {
                  handleChangeFormData("previous_addresses", e.target.value);
                }}
                value={formData?.previous_addresses}
              />
            </Box>
          </Box>
          <Box mt={3}>
            <label
              style={{
                fontSize: "18px",
                color: "#ff700d",
                borderBottom: "1px dashed #f07917",
                display: "block",
              }}
            >
              Financial Information
            </label>
            <Box mt={2}>
              <TextField
                label="Bank Account Name"
                variant="outlined"
                fullWidth
                size="large"
                onChange={(e) => {
                  handleChangeFormData("bank_account_name", e.target.value);
                }}
                value={formData?.bank_account_name}
                sx={{ mb: 2 }}
              />
              <Box display="flex" gap={2}>
                <Select
                  size="large"
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    handleChangeFormData("account_type", value);
                  }}
                  placeholder="Select Account Type"
                  value={formData?.account_type || null}
                  options={[
                    { label: "Current", value: "current" },
                    { label: "Saving", value: "saving" },
                  ]}
                />
                <TextField
                  label="IFSC Code"
                  variant="outlined"
                  fullWidth
                  size="large"
                  onChange={(e) => {
                    handleChangeFormData("ifsc_code", e.target.value);
                  }}
                  value={formData?.ifsc_code}
                />
              </Box>
            </Box>
          </Box>
          <Box mt={3}>
            <label
              style={{
                fontSize: "18px",
                color: "#ff700d",
                borderBottom: "1px dashed #f07917",
                display: "block",
              }}
            >
              Optional Information
            </label>
            <TextField
              label="Reason For Moving"
              variant="outlined"
              fullWidth
              size="large"
              multiline
              rows={4}
              onChange={(e) => {
                handleChangeFormData("reason_for_moving", e.target.value);
              }}
              value={formData?.reason_for_moving}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RentalForm;
