import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";
import {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} from "./userSlice";

// API base URL
const API_BASE_URL = "http://localhost:5000/api";

// Fetch user profile
function* fetchProfileSaga() {
  try {
    console.log("called for api");
    const token = localStorage.getItem("token"); // Get token from localStorage or other storage

    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/users/profile`,
      config
    );
    yield put(fetchProfileSuccess(response.data));
    toast.success("Profile fetched successfully"); // Display success message using toast
  } catch (error) {
    yield put(
      fetchProfileFailure(
        error.response?.data?.message || "Failed to fetch profile"
      )
    );
    toast.error(error.response?.data?.message || "Failed to fetch profile"); // Display error message using toast
  }
}

// Update user profile
function* updateProfileSaga(action) {
  try {
    const token = localStorage.getItem("token"); // Get token from localStorage or other storage
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(
      axios.put,
      `${API_BASE_URL}/user/profile`,
      action.payload,
      config
    );
    yield put(updateProfileSuccess(response.data));
    toast.success("Profile updated successfully"); // Display success message using toast
  } catch (error) {
    yield put(
      updateProfileFailure(
        error.response?.data?.message || "Failed to update profile"
      )
    );
    toast.error(error.response?.data?.message || "Failed to update profile"); // Display error message using toast
  }
}

// Watcher Sagas
export default function* userSaga() {
  yield takeLatest(fetchProfileRequest.type, fetchProfileSaga);
  yield takeLatest(updateProfileRequest.type, updateProfileSaga);
}
