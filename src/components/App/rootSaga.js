import { all } from "redux-saga/effects";
import { watchError } from "../Error/errorSaga";
import watchAuthRequests from "../Auth/authSaga";
import watchUserRequests from "../UserProfile/userSaga"; // Import userSaga

export default function* rootSaga() {
  yield all([
    watchError(),
    watchAuthRequests(),
    watchUserRequests(), // Add userSaga to the root saga
  ]);
}
