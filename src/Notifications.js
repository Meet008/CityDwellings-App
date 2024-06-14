// components/Notifications.js
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications = () => (
  <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
);

export default Notifications;
