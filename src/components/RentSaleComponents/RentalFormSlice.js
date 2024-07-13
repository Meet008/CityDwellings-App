import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    full_name: "",
    phone_number: "",
    email: "",
    current_address: "",
    previous_addresses: "",
    bank_account_name: "",
    account_type: "",
    ifsc_code: "",
    reason_for_moving: "",
  },
  isLoading: false,
  error: null,
  submissionSuccess: false,
};

const rentalFormSlice = createSlice({
  name: "rentalForm",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    submitFormRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.submissionSuccess = false;
    },
    submitFormSuccess: (state) => {
      state.isLoading = false;
      state.submissionSuccess = true;
      state.formData = initialState.formData; // Clear form data after successful submission
    },
    submitFormFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.submissionSuccess = false;
    },
  },
});

export const {
  setFormData,
  submitFormRequest,
  submitFormSuccess,
  submitFormFailure,
} = rentalFormSlice.actions;

export default rentalFormSlice.reducer;
