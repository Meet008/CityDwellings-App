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
  fetchUserApplicationsRequest,
  fetchUserApplicationsSuccess,
  fetchUserApplicationsFailure,
} from "./userSlice";
import { MakeApiCall } from "../../config/axios_call";

// API base URL
const API_BASE_URL = "http://localhost:5000/api";

// Fetch user profile
function* fetchProfileSaga() {
  try {
    // const token = localStorage.getItem("token");
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     token: `${token}`,
    //   },
    // };
    // const response = yield call(
    //   axios.get,
    //   `${API_BASE_URL}/user/profile`,
    //   config
    // );
    const response = yield call(
      MakeApiCall,
      "/user/profile",
      "get",
      null,
      true
    );

    if (response?.status) {
      // when status true and get response before 5 second
      yield put(fetchProfileSuccess(response.data));
    } else {
      // when status false take more then 5 second
      yield put(
        fetchProfileFailure(response?.message || "Failed to fetch profile")
      );
    }
  } catch (error) {
    yield put(
      fetchProfileFailure(
        error.response?.data?.message || "Failed to fetch profile"
      )
    );
  }
}

// Update user profile
function* updateProfileSaga(action) {
  try {
    // const token = localStorage.getItem("token");
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     token: `${token}`,
    //   },
    // };
    // const response = yield call(
    //   axios.put,
    //   `${API_BASE_URL}/user/profile`,
    //   action.payload,
    //   config
    // );
    const response = yield call(
      MakeApiCall,
      "/user/profile",
      "put",
      action.payload,
      true
    );

    if (response?.status) {
      yield put(updateProfileSuccess(response.data));
      toast.success("Profile updated successfully");
    } else {
      yield put(
        updateProfileFailure(response?.message || "Failed to update profile")
      );
    }
  } catch (error) {
    yield put(
      updateProfileFailure(
        error.response?.data?.message || "Failed to update profile"
      )
    );
  }
}

// Add property
function* addPropertySaga(action) {
  try {
    const { formData, navigate } = action.payload;
    // const token = localStorage.getItem("token");
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     token: `${token}`,
    //   },
    // };

    // const response = yield call(
    //   axios.post,
    //   `${API_BASE_URL}/property/add`,
    //   formData,
    //   config
    // );

    const response = yield call(
      MakeApiCall,
      "/property/add",
      "post",
      formData,
      true,
      true
    );

    if (response?.status) {
      yield put(addPropertySuccess(response.data));
      toast.success("Property added successfully");
    } else {
      yield put(
        addPropertyFailure(response?.message || "Failed to add property")
      );
    }

    if (navigate) navigate("/profile/my-properties"); // Redirect after success
  } catch (error) {
    yield put(
      addPropertyFailure(
        error.response?.data?.message || "Failed to add property"
      )
    );
  }
}

// Fetch properties
function* fetchPropertiesSaga() {
  try {
    // const token = localStorage.getItem("token");
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     token: `${token}`,
    //   },
    // };
    // const response = yield call(
    //   axios.get,
    //   `${API_BASE_URL}/property/user-properties`,
    //   config
    // );

    const response = yield call(
      MakeApiCall,
      "/property/user-properties",
      "get",
      null,
      true
    );

    if (response?.status) {
      yield put(fetchPropertiesSuccess(response.data));
    } else {
      yield put(
        fetchPropertiesFailure(
          response?.message || "Failed to fetch properties"
        )
      );
    }
  } catch (error) {
    yield put(
      fetchPropertiesFailure(
        error.response?.data?.message || "Failed to fetch properties"
      )
    );
  }
}

// Fetch property details by ID
function* fetchPropertyDetailsSaga(action) {
  try {
    const { propertyId } = action.payload;
    // const token = localStorage.getItem("token");
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     token: `${token}`,
    //   },
    // };

    // console.log("api call", `${API_BASE_URL}/property/${propertyId}`);
    // const response = yield call(
    //   axios.get,
    //   `${API_BASE_URL}/property/${propertyId}`,
    //   config
    // );

    const response = yield call(
      MakeApiCall,
      `/property/${propertyId}`,
      "get",
      null,
      true
    );

    if (response?.status) {
      yield put(fetchPropertyDetailsSuccess(response.data));
    } else {
      yield put(
        fetchPropertyDetailsFailure(
          response?.message || "Failed to fetch property details"
        )
      );
    }
  } catch (error) {
    yield put(
      fetchPropertyDetailsFailure(
        error.response?.data?.message || "Failed to fetch property details"
      )
    );
  }
}

// Delete property
function* deletePropertySaga(action) {
  try {
    const { propertyId } = action.payload;
    // const token = localStorage.getItem("token");
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     token: `${token}`,
    //   },
    // };
    // yield call(axios.delete, `${API_BASE_URL}/property/${propertyId}`, config);

    const response = yield call(
      MakeApiCall,
      `/property/${propertyId}`,
      "delete",
      null,
      true
    );

    if (response?.status) {
      yield put(deletePropertySuccess(propertyId));
      toast.success("Property deleted successfully");
      // Dispatch fetch properties action to update the list after deletion
      yield put(fetchPropertiesRequest());
    } else {
      yield put(
        deletePropertyFailure(response?.message || "Failed to delete property")
      );
    }
  } catch (error) {
    yield put(
      deletePropertyFailure(
        error.response?.data?.message || "Failed to delete property"
      )
    );
  }
}

// Edit property
function* editPropertySaga(action) {
  try {
    const { propertyId, formData, navigate } = action.payload;
    // const token = localStorage.getItem("token");
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     token: `${token}`,
    //   },
    // };

    // const response = yield call(
    //   axios.put,
    //   `${API_BASE_URL}/property/edit/${propertyId}`,
    //   formData,
    //   config
    // );

    const response = yield call(
      MakeApiCall,
      `/property/edit/${propertyId}`,
      "put",
      formData,
      true,
      true
    );

    if (response?.status) {
      yield put(editPropertySuccess(response.data));
      toast.success("Property updated successfully");
      if (navigate) navigate("/profile/my-properties"); // Redirect after success
    } else {
      yield put(
        editPropertyFailure(response?.message || "Failed to update property")
      );
    }
  } catch (error) {
    yield put(
      editPropertyFailure(
        error.response?.data?.message || "Failed to update property"
      )
    );
  }
}

// Fetch dashboard data
function* fetchDashboardDataSaga() {
  try {
    const response = yield call(
      MakeApiCall,
      "/property/dashboard",
      "get",
      null,
      true
    );

    if (response?.status) {
      // when status true and get response before 5 second
      yield put(fetchDashboardDataSuccess(response.data));
    } else {
      // when status false take more then 5 second
      yield put(
        fetchDashboardDataFailure(
          response?.message || "Failed to fetch dashboard data"
        )
      );
    }
  } catch (error) {
    yield put(
      fetchDashboardDataFailure(
        error.response?.data?.message || "Failed to fetch dashboard data"
      )
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

    // const response = yield call(
    //   axios.post,
    //   "http://localhost:5000/api/reviews",
    //   { user_name, review, suggestion, propertyId, userId },
    //   config
    // );

    const data = { user_name, review, suggestion, propertyId, userId };
    const response = yield call(MakeApiCall, `/reviews`, "post", data, true);

    if (response?.status) {
      yield put(addReviewSuccess(response.data));
      toast.success("Review added successfully");
    } else {
      yield put(addReviewFailure(response?.message || "Failed to add review"));
    }
  } catch (error) {
    yield put(
      addReviewFailure(error.response?.data?.message || "Failed to add review")
    );
  }
}

function* fetchReviewsSaga() {
  try {
    // const token = localStorage.getItem("token");
    // console.log("token", token);
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     token: `${token}`,
    //   },
    // };
    // const response = yield call(axios.get, `${API_BASE_URL}/reviews`, config);

    const response = yield call(MakeApiCall, `/reviews`, "get", null, true);

    if (response?.status) {
      yield put(fetchReviewsSuccess(response.data));
    } else {
      yield put(fetchReviewsFailure(response.message));
    }
  } catch (error) {
    yield put(fetchReviewsFailure(error.message));
  }
}

// Fetch rental applications
function* fetchRentalApplicationsSaga(action) {
  try {
    const { propertyId } = action.payload;
    // const token = localStorage.getItem("token");
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     token: `${token}`,
    //   },
    // };
    // const response = yield call(
    //   axios.get,
    //   `${API_BASE_URL}/rental_form/property/${propertyId}`,
    //   config
    // );

    const response = yield call(
      MakeApiCall,
      `/rental_form/property/${propertyId}`,
      "get",
      null,
      true
    );

    if (response?.status) {
      yield put(fetchRentalApplicationsSuccess(response.data));
    } else {
      yield put(
        fetchRentalApplicationsFailure(
          response?.message || "Failed to fetch rental applications"
        )
      );
    }
  } catch (error) {
    yield put(
      fetchRentalApplicationsFailure(
        error.response?.data?.message || "Failed to fetch rental applications"
      )
    );
  }
}

// Update rental application status
function* updateRentalApplicationStatusSaga(action) {
  try {
    const { applicationId, status } = action.payload;
    // const token = localStorage.getItem("token");
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     token: `${token}`,
    //   },
    // };
    // const response = yield call(
    //   axios.put,
    //   `${API_BASE_URL}/rental_form/${applicationId}/status`,
    //   { status },
    //   config
    // );

    const response = yield call(
      MakeApiCall,
      `/rental_form/${applicationId}/status`,
      "put",
      { status },
      true
    );

    if (response?.status) {
      yield put(updateRentalApplicationStatusSuccess(response.data));
      toast.success("Rental application status updated successfully");
    } else {
      yield put(
        updateRentalApplicationStatusFailure(
          response?.message || "Failed to update rental application status"
        )
      );
    }
  } catch (error) {
    yield put(
      updateRentalApplicationStatusFailure(
        error.response?.data?.message ||
          "Failed to update rental application status"
      )
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
      MakeApiCall,
      `/rental_form/user/${userId}`,
      "get",
      null,
      true
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
  yield takeLatest(
    fetchUserApplicationsRequest.type,
    fetchUserApplicationsSaga
  );
}
