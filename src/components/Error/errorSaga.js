import { takeEvery, put } from "redux-saga/effects";
import { setError, clearError } from "./errorSlice";
import {
  fetchProfileFailure,
  updateProfileFailure,
} from "../UserProfile/userSlice.js";

function* handleError(action) {
  yield put(setError(action.payload));
  // Clear the error after a delay (optional)
  // yield delay(5000); // Uncomment if you have delay function setup
  // yield put(clearError());
}

export function* watchError() {
  yield takeEvery(fetchProfileFailure.type, handleError);
  yield takeEvery(updateProfileFailure.type, handleError);
}
