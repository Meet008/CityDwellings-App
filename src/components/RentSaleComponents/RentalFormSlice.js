import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    full_name: "",
    phone_number: "",
    email: "",
    date_of_birth: "",
    driver_license_number: "",
    current_address: "",
    previous_addresses: [],
    previous_employers: [],

    emergency_contact: {
      name: "",
      relationship: "",
      phone_number: "",
    },

    authorization_and_consent: {
      signature: "",
      date: "",
      consent_for_checks: false,
    },
    minimum_stay: "",
  },

  isLoading: false,
  error: null,
  submissionSuccess: false,

  applications: [],
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
    clearForm: (state) => {
      state.isLoading = false;
      state.submissionSuccess = false;
      state.formData = initialState.formData;
    },
    editFormRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    editFormSuccess: (state) => {
      state.isLoading = false;
      state.submissionSuccess = true;
      state.formData = initialState.formData;
    },
    editFormFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.submissionSuccess = false;
    },
    deleteApplicationRequest: (state) => {
      state.isLoading = true;
    },
    deleteApplicationSuccess: (state, action) => {
      state.isLoading = false;
      state.applications = state.applications.filter(
        (application) => application._id !== action.payload
      );
    },
    deleteApplicationFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchUserRentApplicationsRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchUserRentApplicationsSuccess(state, action) {
      state.isLoading = false;
      state.applications = action.payload;
    },
    fetchUserRentApplicationsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setFormData,
  submitFormRequest,
  submitFormSuccess,
  submitFormFailure,
  deleteApplicationRequest,
  deleteApplicationSuccess,
  deleteApplicationFailure,
  fetchUserRentApplicationsRequest,
  fetchUserRentApplicationsSuccess,
  fetchUserRentApplicationsFailure,
  clearForm,
  editFormRequest,
  editFormSuccess,
  editFormFailure,
} = rentalFormSlice.actions;

export default rentalFormSlice.reducer;
