// userSaga.js

import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  fetchPropertiesRequest,
  fetchPropertiesSuccess,
  fetchPropertiesFailure,
  fetchFilterOptionsRequest,
  fetchFilterOptionsSuccess,
  fetchFilterOptionsFailure,
  fetchPropertyByIdRequest,
  fetchPropertyByIdSuccess,
  fetchPropertyByIdFailure,
} from "./RentSaleSlice";
import { toast } from "react-toastify";

// API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL;

function* fetchPropertiesSaga(action) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };

    const { filters } = action.payload;
    const queryParams = new URLSearchParams(filters).toString();

    const response = yield call(
      axios.get,
      `${API_BASE_URL}/property/category?${queryParams}`
    );

    yield put(fetchPropertiesSuccess(response.data));
  } catch (error) {
    console.error("Fetch properties error:", error.response.data); // Log the error for debugging

    if (error.response && error.response.data) {
      // If the API returns a specific error message
      yield put(fetchPropertiesFailure(error.response.data));
      toast.error(error.response.data); // Notify user with specific error message
    } else {
      // Default server error message
      yield put(fetchPropertiesFailure("Server error"));
      toast.error("Failed to fetch properties. Please try again."); // Notify user with default message
    }
  }
}

function* fetchFilterOptionsSaga() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };

    const response = yield call(axios.get, `${API_BASE_URL}/property/filters`);

    yield put(fetchFilterOptionsSuccess(response.data));
  } catch (error) {
    console.error("Fetch filter options error:", error.response); // Log the error for debugging

    if (error.response && error.response.data) {
      // If the API returns a specific error message
      yield put(fetchFilterOptionsFailure(error.response.data));
      toast.error(error.response.data); // Notify user with specific error message
    } else {
      // Default server error message
      yield put(fetchFilterOptionsFailure("Server error"));
      toast.error("Failed to fetch filter options. Please try again."); // Notify user with default message
    }
  }
}

function* fetchPropertyByIdSaga(action) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        // token: `${token}`,
      },
    };

    const { id } = action.payload;

    const response = yield call(
      axios.get,
      `${API_BASE_URL}/property/${id}`,
      config
    );

    yield put(fetchPropertyByIdSuccess(response.data));
  } catch (error) {
    console.error("Fetch property by ID error:", error.response);

    if (error.response && error.response.data) {
      yield put(fetchPropertyByIdFailure(error.response.data));
      toast.error(error.response.data);
    } else {
      yield put(fetchPropertyByIdFailure("Server error"));
      toast.error("Failed to fetch property details. Please try again.");
    }
  }
}

export default function* watchFetchProperties() {
  yield takeLatest(fetchPropertiesRequest.type, fetchPropertiesSaga);
  yield takeLatest(fetchFilterOptionsRequest.type, fetchFilterOptionsSaga);
  yield takeLatest(fetchPropertyByIdRequest.type, fetchPropertyByIdSaga);
}
