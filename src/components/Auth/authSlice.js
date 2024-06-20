import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  user: null,
  forgotPasswordSuccess: false,
  updatePasswordSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    registerFail: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    },
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    loginFail: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    },
    forgotPasswordRequest: (state) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.forgotPasswordSuccess = true;
      state.user = action.payload;
    },
    forgotPasswordFail: (state) => {
      state.loading = false;
      state.forgotPasswordSuccess = false;
    },
    updatePasswordRequest: (state) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state) => {
      state.loading = false;
      state.updatePasswordSuccess = true;
    },
    updatePasswordFail: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFail,
  loginRequest,
  loginSuccess,
  loginFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
