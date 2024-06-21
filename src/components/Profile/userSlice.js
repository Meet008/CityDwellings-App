import { createSlice } from "@reduxjs/toolkit";
import Dashboard from "./Dashboard";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  properties: [],
  propertyDetails: [],
  messages: [],
  dashboardData: {
    totalCommercial: 0,
    totalResidential: 0,
    propertiesList: [],
    series: [],
    pieSeries: [],
  },
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
      state.properties = [];
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
} = userSlice.actions;

export default userSlice.reducer;
