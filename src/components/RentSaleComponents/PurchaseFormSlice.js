import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    full_name: "",
    phone_number: "",
    email: "",
    date_of_birth: "",
    current_address: "",
    identification_number: "",
    employer_name: "",
    employer_address: "",
    job_title: "",
    monthly_income: "",
    employment_duration: "",
    employer_contact: "",
    proof_of_income: "",
    credit_score: "",
    current_debts: "",
    proof_of_funds: "",
    pre_approval_letter: "",
    offer_price: "",
    down_payment_amount: "",
    mortgage_amount: "",
    preferred_closing_date: "",
    contingencies: "",
    marital_status: "",
    dependents: "",
    emergency_contact: "",
    consent_for_checks: false,
    signature: "",
    date: "",
  },

  isLoading: false,
  error: null,
  submissionSuccess: false,

  applications: [],
};

const purchaseFormSlice = createSlice({
  name: "purchaseForm",
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
    deletePurchaseApplicationRequest: (state) => {
      state.isLoading = true;
    },
    deletePurchaseApplicationSuccess: (state, action) => {
      state.isLoading = false;
      state.applications = state.applications.filter(
        (application) => application._id !== action.payload
      );
    },
    deletePurchaseApplicationFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchUserPurchaseApplicationsRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchUserPurchaseApplicationsSuccess(state, action) {
      state.isLoading = false;
      state.applications = action.payload;
    },
    fetchUserPurchaseApplicationsFailure(state, action) {
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
  clearForm,
  editFormRequest,
  editFormSuccess,
  editFormFailure,
  deletePurchaseApplicationRequest,
  deletePurchaseApplicationSuccess,
  deletePurchaseApplicationFailure,
  fetchUserPurchaseApplicationsRequest,
  fetchUserPurchaseApplicationsSuccess,
  fetchUserPurchaseApplicationsFailure,
} = purchaseFormSlice.actions;

export default purchaseFormSlice.reducer;
