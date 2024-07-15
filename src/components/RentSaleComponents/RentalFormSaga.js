import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";
import {
  submitFormRequest,
  submitFormSuccess,
  submitFormFailure,
} from "./RentalFormSlice";

// API base URL
const API_BASE_URL = "http://localhost:5000/api";

// Submit rental form
function* submitRentalFormSaga(action) {
  try {
    const { propertyId, formData } = action.payload;
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const userId = user._id;

    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };

    const response = yield call(
      axios.post,
      `${API_BASE_URL}/rental_form/`,
      { propertyId, formData, userId }, // Combine propertyId and formData into one object
      config
    );

    yield put(submitFormSuccess());
    toast.success("Rental form submitted successfully");
  } catch (error) {
    yield put(
      submitFormFailure(
        error.response?.data?.message || "Failed to submit rental form"
      )
    );
    toast.error(
      error.response?.data?.message || "Failed to submit rental form"
    );
  }
}

// Watcher Saga
export default function* rentalFormSaga() {
  yield takeLatest(submitFormRequest.type, submitRentalFormSaga);
}
