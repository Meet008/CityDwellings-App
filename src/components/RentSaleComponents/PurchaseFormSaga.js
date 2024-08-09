import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";
import {
  submitFormRequest,
  submitFormSuccess,
  submitFormFailure,
  deletePurchaseApplicationRequest,
  deletePurchaseApplicationSuccess,
  deletePurchaseApplicationFailure,
  fetchUserPurchaseApplicationsRequest,
  fetchUserPurchaseApplicationsSuccess,
  fetchUserPurchaseApplicationsFailure,
  editFormRequest,
  editFormSuccess,
  editFormFailure,
} from "./PurchaseFormSlice";

// API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Submit purchase form
function* submitPurchaseFormSaga(action) {
  try {
    const { propertyId, formData } = action.payload;

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
      `${API_BASE_URL}/purchase_form`,
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
    const { propertyId, formData } = action.payload;
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };

    yield call(
      axios.put,
      `${API_BASE_URL}/purchase_form/${propertyId}`,
      formData,
      config
    );

    yield put(editFormSuccess());
    yield put(fetchUserPurchaseApplicationsRequest()); // Refresh the list of applications
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

    yield call(axios.delete, `${API_BASE_URL}/purchase_form/${id}`, config);

    yield put(deletePurchaseApplicationSuccess(id));
    toast.success("Purchase form deleted successfully");
  } catch (error) {
    yield put(
      deletePurchaseApplicationFailure(
        error.response?.data?.message || "Failed to delete purchase form"
      )
    );
    toast.error(
      error.response?.data?.message || "Failed to delete purchase form"
    );
  }
}

// Fetch user applications
function* fetchUserPurchaseApplicationsSaga() {
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
      `${API_BASE_URL}/purchase_form/user/${userId}`,
      config
    );
    yield put(fetchUserPurchaseApplicationsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchUserPurchaseApplicationsFailure(
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
  yield takeLatest(
    deletePurchaseApplicationRequest.type,
    deletePurchaseFormSaga
  );
  yield takeLatest(
    fetchUserPurchaseApplicationsRequest.type,
    fetchUserPurchaseApplicationsSaga
  );
  yield takeLatest(editFormRequest.type, editPurchaseFormSaga);
}
