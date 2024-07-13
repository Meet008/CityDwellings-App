import { createSlice } from "@reduxjs/toolkit";
import Dashboard from "./Dashboard";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  error: null,
  properties: [],
  propertyDetails: [],
  reviewList: [],
  dashboardData: {
    totalCommercial: 0,
    totalResidential: 0,
    propertiesList: [],
    series: [],
    pieSeries: [],
  },
  applications: [],
  updateStatus: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchProfileRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    fetchProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateProfileRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    updateProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addPropertyRequest: (state) => {
      state.isLoading = true;
    },
    addPropertySuccess: (state, action) => {
      state.isLoading = false;
      state.properties.push(action.payload);
    },
    addPropertyFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchPropertiesRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPropertiesSuccess: (state, action) => {
      state.isLoading = false;
      state.properties = action.payload;
    },
    fetchPropertiesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchPropertyDetailsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.propertyDetails = [];
    },
    fetchPropertyDetailsSuccess: (state, action) => {
      state.isLoading = false;
      state.propertyDetails = action.payload;
    },
    fetchPropertyDetailsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deletePropertyRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deletePropertySuccess: (state, action) => {
      state.isLoading = false;
      state.properties = state.properties.filter(
        (property) => property.id !== action.payload
      );
    },
    deletePropertyFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    editPropertyRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    editPropertySuccess: (state, action) => {
      state.isLoading = false;
      const index = state.properties.findIndex(
        (property) => property.id === action.payload.id
      );
      if (index !== -1) {
        state.properties[index] = action.payload;
      }
    },
    editPropertyFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchDashboardDataStart(state, action) {
      state.isLoading = true;
    },
    fetchDashboardDataSuccess(state, action) {
      state.isLoading = false;
      state.dashboardData = action.payload;
    },
    fetchDashboardDataFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addReviewRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    addReviewSuccess: (state, action) => {
      state.isLoading = false;
      state.reviewList.push(action.payload);
    },
    addReviewFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchReviewsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchReviewsSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.reviewList = action.payload;
    },
    fetchReviewsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchRentalApplicationsRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchRentalApplicationsSuccess(state, action) {
      state.isLoading = false;
      state.applications = action.payload;
    },
    fetchRentalApplicationsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateRentalApplicationStatusRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.updateStatus = "pending";
    },
    updateRentalApplicationStatusSuccess: (state, action) => {
      const updatedApplication = action.payload;
      state.applications = state.applications.map((application) =>
        application._id === updatedApplication._id
          ? updatedApplication
          : application
      );
      state.isLoading = false;
      state.updateStatus = "success";
    },
    updateRentalApplicationStatusFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.updateStatus = "failure";
    },
    resetUserState: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  addPropertyRequest,
  addPropertySuccess,
  addPropertyFailure,
  fetchPropertiesRequest,
  fetchPropertiesSuccess,
  fetchPropertiesFailure,
  deletePropertyRequest,
  deletePropertySuccess,
  deletePropertyFailure,
  editPropertyRequest,
  editPropertySuccess,
  editPropertyFailure,
  fetchPropertyDetailsRequest,
  fetchPropertyDetailsSuccess,
  fetchPropertyDetailsFailure,
  fetchDashboardDataStart,
  fetchDashboardDataSuccess,
  fetchDashboardDataFailure,
  addReviewRequest,
  addReviewSuccess,
  addReviewFailure,
  fetchReviewsRequest,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  fetchRentalApplicationsRequest,
  fetchRentalApplicationsSuccess,
  fetchRentalApplicationsFailure,
  updateRentalApplicationStatusRequest,
  updateRentalApplicationStatusSuccess,
  updateRentalApplicationStatusFailure,
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;
