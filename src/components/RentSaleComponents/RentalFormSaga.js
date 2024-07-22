import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";
import {
  submitFormRequest,
  submitFormSuccess,
  submitFormFailure,
  deleteApplicationRequest,
  deleteApplicationSuccess,
  deleteApplicationFailure,
  fetchUserApplicationsRequest,
  fetchUserApplicationsSuccess,
  fetchUserApplicationsFailure,
} from "./RentalFormSlice";

// API base URL
const API_BASE_URL = "http://localhost:5000/api";

// Submit rental form
function* submitRentalFormSaga(action) {
  try {
    const { propertyId, formData } = action.payload;
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")); // Parse the JSON string
    const userId = user?._id; // Optional chaining to safely access the _id

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

// Delete rental form
function* deleteRentalFormSaga(action) {
  try {
    const { formId } = action.payload;
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        token: `${token}`,
      },
    };

    yield call(axios.delete, `${API_BASE_URL}/rental_form/${formId}`, config);

    yield put(deleteApplicationSuccess(formId));
    toast.success("Rental form deleted successfully");
  } catch (error) {
    yield put(
      deleteApplicationFailure(
        error.response?.data?.message || "Failed to delete rental form"
      )
    );
    toast.error(
      error.response?.data?.message || "Failed to delete rental form"
    );
  }
}

// Fetch rental applications
function* fetchUserApplicationsSaga(action) {
  try {
    const { userId } = action.payload;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/rental_form/user/${userId}`,
      config
    );
    yield put(fetchUserApplicationsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchUserApplicationsFailure(
        error.response?.data?.message || "Failed to fetch applications"
      )
    );
    toast.error(
      error.response?.data?.message || "Failed to fetch applications"
    );
  }
}

// Watcher Saga
export default function* rentalFormSaga() {
  yield takeLatest(submitFormRequest.type, submitRentalFormSaga);
  yield takeLatest(deleteApplicationRequest.type, deleteRentalFormSaga);
  yield takeLatest(
    fetchUserApplicationsRequest.type,
    fetchUserApplicationsSaga
  );
}
