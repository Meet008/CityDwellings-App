import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "../Auth/authSlice";
import errorReducer from "../Error/errorSlice";
import userReducer from "../Profile/userSlice";
import rentSaleReducer from "../RentSaleComponents/RentSaleSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    user: userReducer,
    rentsale: rentSaleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
