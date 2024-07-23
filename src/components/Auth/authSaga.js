import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";
import {
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
} from "./authSlice";
import { fetchProfileRequest } from "../Profile/userSlice"; // Import fetchUserProfile action

// Worker Sagas
function* registerUser(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:5000/api/auth/register",
      action.payload
    );
    yield put(registerSuccess(res.data));
    yield put(fetchProfileRequest());
    toast.success("Registration successful"); // Display success message using toast
  } catch (err) {
    yield put(registerFail(err.response.data));
    if (
      err.response &&
      err.response.data &&
      err.response.data.errors &&
      err.response.data.errors.length > 0
    ) {
      toast.error(err.response.data.errors[0].msg); // Display error message using toast
    } else {
      toast.error("An unexpected error occurred"); // Display a generic error message
    }
  }
}

function* loginUser(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:5000/api/auth/login",
      action.payload
    );
    yield put(loginSuccess(res.data));
    yield put(fetchProfileRequest()); // Dispatch fetchUserProfile action after successful login
    toast.success("Login successful"); // Display success message using toast
  } catch (err) {
    yield put(loginFail(err.response.data));

    // Access the error message from the errors array
    if (
      err.response &&
      err.response.data &&
      err.response.data.errors &&
      err.response.data.errors.length > 0
    ) {
      toast.error(err.response.data.errors[0].msg); // Display error message using toast
    } else {
      toast.error("An unexpected error occurred"); // Display a generic error message
    }
  }
}

function* forgotPassword(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:5000/api/auth/forgot-password",
      action.payload
    );
    yield put(forgotPasswordSuccess(res.data));
    toast.success("Password reset email sent successfully");
  } catch (err) {
    yield put(forgotPasswordFail(err.response.data));
    if (
      err.response &&
      err.response.data &&
      err.response.data.errors &&
      err.response.data.errors.length > 0
    ) {
      toast.error(err.response.data.errors[0].msg); // Display error message using toast
    } else {
      toast.error("An unexpected error occurred"); // Display a generic error message
    }
  }
}

function* updatePassword(action) {
  try {
    const res = yield call(
      axios.put,
      "http://localhost:5000/api/auth/update-password",
      action.payload
    );
    yield put(updatePasswordSuccess(res.data));
    toast.success("Password updated successfully");
  } catch (err) {
    yield put(updatePasswordFail(err.response.data));
    if (
      err.response &&
      err.response.data &&
      err.response.data.errors &&
      err.response.data.errors.length > 0
    ) {
      toast.error(err.response.data.errors[0].msg); // Display error message using toast
    } else {
      toast.error("An unexpected error occurred"); // Display a generic error message
    }
  }
}

// Watcher Sagas
export default function* watchAuthRequests() {
  yield takeLatest(registerRequest.type, registerUser);
  yield takeLatest(loginRequest.type, loginUser);
  yield takeLatest(forgotPasswordRequest.type, forgotPassword);
  yield takeLatest(updatePasswordRequest.type, updatePassword);
}
