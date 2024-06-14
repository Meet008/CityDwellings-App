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
    toast.success("Registration successful"); // Display success message using toast
  } catch (err) {
    yield put(registerFail(err.response.data));
    toast.error(err.response.data.msg); // Display error message using toast
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
    toast.error(err.response.data.msg); // Display error message using toast
  }
}

// Watcher Sagas
export default function* watchAuthRequests() {
  yield takeLatest(registerRequest.type, registerUser);
  yield takeLatest(loginRequest.type, loginUser);
}
