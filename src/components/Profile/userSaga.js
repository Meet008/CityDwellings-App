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
} from "./userSlice";

// API base URL
const API_BASE_URL = "http://localhost:5000/api";

// Fetch user profile
function* fetchProfileSaga() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/user/profile`,
      config
    );
    yield put(fetchProfileSuccess(response.data));
    // No need to display a toast here, but you can add it if necessary
  } catch (error) {
    yield put(
      fetchProfileFailure(
        error.response?.data?.message || "Failed to fetch profile"
      )
    );
    // Display error message using toast
    toast.error(error.response?.data?.message || "Failed to fetch profile");
  }
}

// Update user profile
function* updateProfileSaga(action) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const response = yield call(
      axios.put,
      `${API_BASE_URL}/user/profile`,
      action.payload,
      config
    );
    yield put(updateProfileSuccess(response.data));
    toast.success("Profile updated successfully");
  } catch (error) {
    yield put(
      updateProfileFailure(
        error.response?.data?.message || "Failed to update profile"
      )
    );
    toast.error(error.response?.data?.message || "Failed to update profile");
  }
}

// Add property
function* addPropertySaga(action) {
  try {
    const { formData, navigate } = action.payload;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        token: `${token}`,
      },
    };

    const response = yield call(
      axios.post,
      `${API_BASE_URL}/property/add`,
      formData,
      config
    );

    yield put(addPropertySuccess(response.data));
    toast.success("Property added successfully");
    if (navigate) navigate("/profile/my-properties"); // Redirect after success
  } catch (error) {
    yield put(
      addPropertyFailure(
        error.response?.data?.message || "Failed to add property"
      )
    );
    toast.error(error.response?.data?.message || "Failed to add property");
  }
}

// Fetch properties
function* fetchPropertiesSaga() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/property/user-properties`,
      config
    );
    yield put(fetchPropertiesSuccess(response.data));
  } catch (error) {
    yield put(
      fetchPropertiesFailure(
        error.response?.data?.message || "Failed to fetch properties"
      )
    );
    toast.error(error.response?.data?.message || "Failed to fetch properties");
  }
}

// Fetch property details by ID
function* fetchPropertyDetailsSaga(action) {
  try {
    const { propertyId } = action.payload;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };

    console.log("api call", `${API_BASE_URL}/property/${propertyId}`);
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/property/${propertyId}`,
      config
    );

    yield put(fetchPropertyDetailsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchPropertyDetailsFailure(
        error.response?.data?.message || "Failed to fetch property details"
      )
    );
    toast.error(
      error.response?.data?.message || "Failed to fetch property details"
    );
  }
}

// Delete property
function* deletePropertySaga(action) {
  try {
    const { propertyId } = action.payload;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    yield call(axios.delete, `${API_BASE_URL}/property/${propertyId}`, config);
    yield put(deletePropertySuccess(propertyId));
    toast.success("Property deleted successfully");

    // Dispatch fetch properties action to update the list after deletion
    yield put(fetchPropertiesRequest());
  } catch (error) {
    yield put(
      deletePropertyFailure(
        error.response?.data?.message || "Failed to delete property"
      )
    );
    toast.error(error.response?.data?.message || "Failed to delete property");
  }
}

// Edit property
function* editPropertySaga(action) {
  try {
    const { propertyId, formData, navigate } = action.payload;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        token: `${token}`,
      },
    };

    const response = yield call(
      axios.put,
      `${API_BASE_URL}/property/edit/${propertyId}`,
      formData,
      config
    );

    yield put(editPropertySuccess(response.data));
    toast.success("Property updated successfully");
    if (navigate) navigate("/profile/my-properties"); // Redirect after success
  } catch (error) {
    yield put(
      editPropertyFailure(
        error.response?.data?.message || "Failed to update property"
      )
    );
    toast.error(error.response?.data?.message || "Failed to update property");
  }
}

// Fetch dashboard data
function* fetchDashboardDataSaga() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/property/dashboard`,
      config
    );
    yield put(fetchDashboardDataSuccess(response.data));
  } catch (error) {
    yield put(
      fetchDashboardDataFailure(
        error.response?.data?.message || "Failed to fetch dashboard data"
      )
    );
    toast.error(
      error.response?.data?.message || "Failed to fetch dashboard data"
    );
  }
}

// Add review saga
function* addReviewSaga(action) {
  try {
    const { user_name, review, suggestion, propertyId } = action.payload;

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
      "http://localhost:5000/api/reviews",
      { user_name, review, suggestion, propertyId, userId },
      config
    );

    yield put(addReviewSuccess(response.data));
    toast.success("Review added successfully");
  } catch (error) {
    yield put(
      addReviewFailure(error.response?.data?.message || "Failed to add review")
    );
    toast.error(error.response?.data?.message || "Failed to add review");
  }
}

function* fetchReviewsSaga() {
  try {
    const token = localStorage.getItem("token");
    console.log("token", token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const response = yield call(axios.get, `${API_BASE_URL}/reviews`, config);
    yield put(fetchReviewsSuccess(response.data));
  } catch (error) {
    yield put(fetchReviewsFailure(error.message));
    toast.error(error.message || "Failed to fetch reviews");
  }
}

// Fetch rental applications
function* fetchRentalApplicationsSaga(action) {
  try {
    const { propertyId } = action.payload;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/rental_form/property/${propertyId}`,
      config
    );
    yield put(fetchRentalApplicationsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchRentalApplicationsFailure(
        error.response?.data?.message || "Failed to fetch rental applications"
      )
    );
    toast.error(
      error.response?.data?.message || "Failed to fetch rental applications"
    );
  }
}

// Update rental application status
function* updateRentalApplicationStatusSaga(action) {
  try {
    const { applicationId, status } = action.payload;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const response = yield call(
      axios.put,
      `${API_BASE_URL}/rental_form/${applicationId}/status`,
      { status },
      config
    );
    yield put(updateRentalApplicationStatusSuccess(response.data));
    toast.success("Rental application status updated successfully");
  } catch (error) {
    yield put(
      updateRentalApplicationStatusFailure(
        error.response?.data?.message ||
          "Failed to update rental application status"
      )
    );
    toast.error(
      error.response?.data?.message ||
        "Failed to update rental application status"
    );
  }
}

// Watcher Sagas
export default function* userSaga() {
  yield takeLatest(fetchProfileRequest.type, fetchProfileSaga);
  yield takeLatest(updateProfileRequest.type, updateProfileSaga);
  yield takeLatest(addPropertyRequest.type, addPropertySaga);
  yield takeLatest(fetchPropertiesRequest.type, fetchPropertiesSaga);
  yield takeLatest(deletePropertyRequest.type, deletePropertySaga);
  yield takeLatest(editPropertyRequest.type, editPropertySaga);
  yield takeLatest(fetchPropertyDetailsRequest.type, fetchPropertyDetailsSaga);
  yield takeLatest(fetchDashboardDataStart.type, fetchDashboardDataSaga);
  yield takeLatest(addReviewRequest.type, addReviewSaga);
  yield takeLatest(fetchReviewsRequest.type, fetchReviewsSaga);
  yield takeLatest(
    fetchRentalApplicationsRequest.type,
    fetchRentalApplicationsSaga
  );
  yield takeLatest(
    updateRentalApplicationStatusRequest.type,
    updateRentalApplicationStatusSaga
  );
}
