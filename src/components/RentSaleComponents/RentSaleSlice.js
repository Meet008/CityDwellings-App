import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  properties: [],
  filterOptions: {},
};

const RentSaleSlice = createSlice({
  name: "RentSale",
  initialState,
  reducers: {
    fetchPropertiesRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchPropertiesSuccess(state, action) {
      state.properties = action.payload;
      state.isLoading = false;
    },
    fetchPropertiesFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchFilterOptionsRequest: (state) => {
      state.loading = true;
    },
    fetchFilterOptionsSuccess: (state, action) => {
      state.loading = false;
      state.filterOptions = action.payload;
    },
    fetchFilterOptionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPropertiesRequest,
  fetchPropertiesSuccess,
  fetchPropertiesFailure,
  fetchFilterOptionsRequest,
  fetchFilterOptionsSuccess,
  fetchFilterOptionsFailure,
} = RentSaleSlice.actions;

export default RentSaleSlice.reducer;
