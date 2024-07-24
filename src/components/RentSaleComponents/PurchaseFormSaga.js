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
  editFormRequest,
  editFormSuccess,
  editFormFailure,
} from "./PurchaseFormSlice";

// API base URL
const API_BASE_URL = "http://localhost:5000/api/purchase_form";

// Submit purchase form
function* submitPurchaseFormSaga(action) {
  try {
    const { propertyId, formData } = action.payload;
    console.log(propertyId, formData);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };

    yield call(
      axios.post,
      `${API_BASE_URL}`,
      { propertyId, formData, userId },
      config
    );

    yield put(submitFormSuccess());
    toast.success("Purchase form submitted successfully");
  } catch (error) {
    yield put(
      submitFormFailure(
        error.response?.data?.message || "Failed to submit purchase form"
      )
    );
    toast.error(
      error.response?.data?.message || "Failed to submit purchase form"
    );
  }
}

// Edit purchase form
function* editPurchaseFormSaga(action) {
  try {
    const { id, formData } = action.payload;
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };

    yield call(axios.put, `${API_BASE_URL}/${id}`, formData, config);

    yield put(editFormSuccess());
    yield put(fetchUserApplicationsRequest()); // Refresh the list of applications
    toast.success("Purchase form updated successfully");
  } catch (error) {
    yield put(
      editFormFailure(
        error.response?.data?.message || "Failed to update purchase form"
      )
    );
    toast.error(
      error.response?.data?.message || "Failed to update purchase form"
    );
  }
}

// Delete purchase form
function* deletePurchaseFormSaga(action) {
  try {
    const { id } = action.payload;
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        token: `${token}`,
      },
    };

    yield call(axios.delete, `${API_BASE_URL}/${id}`, config);

    yield put(deleteApplicationSuccess(id));
    toast.success("Purchase form deleted successfully");
  } catch (error) {
    yield put(
      deleteApplicationFailure(
        error.response?.data?.message || "Failed to delete purchase form"
      )
    );
    toast.error(
      error.response?.data?.message || "Failed to delete purchase form"
    );
  }
}

// Fetch user applications
function* fetchUserApplicationsSaga() {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/user/${userId}`,
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
export default function* purchaseFormSaga() {
  yield takeLatest(submitFormRequest.type, submitPurchaseFormSaga);
  yield takeLatest(deleteApplicationRequest.type, deletePurchaseFormSaga);
  yield takeLatest(
    fetchUserApplicationsRequest.type,
    fetchUserApplicationsSaga
  );
  yield takeLatest(editFormRequest.type, editPurchaseFormSaga);
}
