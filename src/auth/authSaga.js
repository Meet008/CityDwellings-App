import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  registerRequest,
  registerSuccess,
  registerFail,
  loginRequest,
  loginSuccess,
  loginFail,
} from "./authSlice";

// Worker Sagas
function* registerUser(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:5000/api/auth/register",
      action.payload
    );
    yield put(registerSuccess(res.data));
  } catch (err) {
    yield put(registerFail(err.response.data.msg));
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
  } catch (err) {
    yield put(loginFail(err.response.data.msg));
  }
}

// Watcher Sagas
function* watchAuthRequests() {
  yield takeLatest(registerRequest.type, registerUser);
  yield takeLatest(loginRequest.type, loginUser);
}

export default watchAuthRequests;
