// components/ErrorPage.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "./errorSlice";

const ErrorPage = () => {
  const dispatch = useDispatch();
  const { msg, status } = useSelector((state) => state.error);

  const handleRetry = () => {
    dispatch(clearError());
    // Implement retry logic here if needed
  };

  return (
    <div>
      <h1>Error {status}</h1>
      <p>{msg}</p>
      <button onClick={handleRetry}>Retry</button>
    </div>
  );
};

export default ErrorPage;
