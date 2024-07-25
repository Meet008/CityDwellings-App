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
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  setFormData,
  submitFormRequest,
  submitFormSuccess,
  clearForm,
  editFormRequest,
} from "./PurchaseFormSlice"; // Adjust the import path as necessary

import moment from "moment";

const dummyData = {
  full_name: "John Doe",
  phone_number: "123-456-7890",
  email: "johndoe@example.com",
  date_of_birth: "1990-01-01",
  current_address: "123 Main St, Springfield, IL",
  identification_number: "ID1234567",
  employer_name: "ABC Corp",
  employer_address: "456 Elm St, Springfield, IL",
  job_title: "Software Engineer",
  monthly_income: "$5000",
  employment_duration: "3 years",
  employer_contact: "111-222-3333",
  proof_of_income: "Yes",
  credit_score: "750",
  current_debts: "$2000",
  proof_of_funds: "Yes",
  pre_approval_letter: "Yes",
  offer_price: "$300,000",
  down_payment_amount: "$60,000",
  mortgage_amount: "$240,000",
  preferred_closing_date: "2024-08-01",
  contingencies: "None",
  marital_status: "Single",
  dependents: "None",
  emergency_contact: "Mary Doe",
  consent_for_checks: true,
  signature: "John Doe",
  date: "2024-07-16",
};

const PurchaseForm = ({ open, handleClose, propertyId, initialData }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.purchaseForm.formData);
  const isLoading = useSelector((state) => state.purchaseForm.isLoading);
  const submissionSuccess = useSelector(
    (state) => state.purchaseForm.submissionSuccess
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

  const handleSubmit = async (event) => {
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
      console.log("Initial Date of Birth:", initialData.date_of_birth);
      const formattedData = {
        ...initialData,
        date_of_birth: initialData.date_of_birth
          ? formatDateString(initialData.date_of_birth)
          : "",
        date: initialData.date ? formatDateString(initialData.date) : "",
      };
      console.log("Formatted Data:", formattedData);
      dispatch(setFormData(formattedData));
    } else {
      dispatch(setFormData({}));
    }
  }, [dispatch, initialData]);
  const formatDateString = (dateString) => {
    // Parse the date in ISO format and format it to 'YYYY-MM-DD'
    return moment(dateString).format("YYYY-MM-DD");
  };

  const parseDateString = (dateString) => {
    // Parse the date string in 'YYYY-MM-DD' format to a moment object
    return moment(dateString, "YYYY-MM-DD").toISOString();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
      <DialogTitle
        sx={{ fontSize: "22px", color: "#ff700d", textAlign: "center" }}
      >
        Purchase Application
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
            value={
              formData?.date_of_birth
                ? formatDateString(formData.date_of_birth)
                : ""
            }
            sx={{ mb: 2, mt: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
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
          <TextField
            label="Identification Number"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("identification_number", e.target.value)
            }
            value={formData?.identification_number || ""}
            sx={{ mb: 2 }}
          />
          <label
            style={{
              fontSize: "18px",
              color: "#ff700d",
              borderBottom: "1px dashed #f07917",
              display: "block",
            }}
          >
            Employment Information
          </label>
          <TextField
            label="Employer Name"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("employer_name", e.target.value)
            }
            value={formData?.employer_name || ""}
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField
            label="Employer Address"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("employer_address", e.target.value)
            }
            value={formData?.employer_address || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Job Title"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChangeFormData("job_title", e.target.value)}
            value={formData?.job_title || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Monthly Income"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("monthly_income", e.target.value)
            }
            value={formData?.monthly_income || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Employment Duration"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("employment_duration", e.target.value)
            }
            value={formData?.employment_duration || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Employer Contact"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("employer_contact", e.target.value)
            }
            value={formData?.employer_contact || ""}
            sx={{ mb: 2 }}
          />
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
          <TextField
            label="Proof of Income"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("proof_of_income", e.target.value)
            }
            value={formData?.proof_of_income || ""}
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField
            label="Credit Score"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("credit_score", e.target.value)
            }
            value={formData?.credit_score || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Current Debts"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("current_debts", e.target.value)
            }
            value={formData?.current_debts || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Proof of Funds"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("proof_of_funds", e.target.value)
            }
            value={formData?.proof_of_funds || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Pre-approval Letter"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("pre_approval_letter", e.target.value)
            }
            value={formData?.pre_approval_letter || ""}
            sx={{ mb: 2 }}
          />
          <label
            style={{
              fontSize: "18px",
              color: "#ff700d",
              borderBottom: "1px dashed #f07917",
              display: "block",
            }}
          >
            Offer Information
          </label>
          <TextField
            label="Offer Price"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("offer_price", e.target.value)
            }
            value={formData?.offer_price || ""}
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField
            label="Down Payment Amount"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("down_payment_amount", e.target.value)
            }
            value={formData?.down_payment_amount || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Mortgage Amount"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("mortgage_amount", e.target.value)
            }
            value={formData?.mortgage_amount || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Preferred Closing Date"
            type="date"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("preferred_closing_date", e.target.value)
            }
            value={formData?.preferred_closing_date || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Contingencies"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("contingencies", e.target.value)
            }
            value={formData?.contingencies || ""}
            sx={{ mb: 2 }}
          />
          <label
            style={{
              fontSize: "18px",
              color: "#ff700d",
              borderBottom: "1px dashed #f07917",
              display: "block",
            }}
          >
            Other Information
          </label>
          <TextField
            label="Marital Status"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("marital_status", e.target.value)
            }
            value={formData?.marital_status || ""}
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField
            label="Dependents"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChangeFormData("dependents", e.target.value)}
            value={formData?.dependents || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Emergency Contact"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              handleChangeFormData("emergency_contact", e.target.value)
            }
            value={formData?.emergency_contact || ""}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData?.consent_for_checks || false}
                onChange={(e) =>
                  handleChangeFormData("consent_for_checks", e.target.checked)
                }
              />
            }
            label="Consent for Background and Credit Checks"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Signature"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChangeFormData("signature", e.target.value)}
            value={formData?.signature || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChangeFormData("date", e.target.value)}
            value={formData?.date || ""}
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

export default PurchaseForm;
