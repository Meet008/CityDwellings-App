import { all } from "redux-saga/effects";
import { watchError } from "../Error/errorSaga";
import watchAuthRequests from "../Auth/authSaga";
import watchUserRequests from "../Profile/userSaga"; // Import userSaga
import watchFetchProperties from "../RentSaleComponents/RentSaleSaga";
import watchRentalForm from "../RentSaleComponents/RentalFormSaga";
import watchPurchaseForm from "../RentSaleComponents/PurchaseFormSaga";

export default function* rootSaga() {
  yield all([
    watchError(),
    watchAuthRequests(),
    watchUserRequests(),
    watchFetchProperties(),
    watchRentalForm(),
    watchPurchaseForm(),
  ]);
}
