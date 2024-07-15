import axios from "axios";
import { ENDPOINT } from "./common_config";
import { toast } from "react-toastify";

const getToken = () => localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: ENDPOINT,
  timeout: 5000, // Default timeout set to 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = "Something went wrong";
    if (error.code === "ECONNABORTED") {
      errorMessage = "Request timed out";
    } else if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
      // Handle specific status codes
      switch (error.response.status) {
        case 400:
          errorMessage = "Bad Request";
          break;
        case 401:
          errorMessage = "Unauthorized";
          break;
        case 404:
          errorMessage = "Not Found";
          break;
        case 500:
          errorMessage = "Internal Server Error";
          break;
        default:
          errorMessage = "An error occurred";
      }
    } else if (error.request) {
      errorMessage = "Network error, please try again later.";
    } else {
      errorMessage = error.message;
    }

    // Display error message using toast
    toast.error(errorMessage);

    return Promise.reject({
      status: false,
      message: errorMessage,
    });
  }
);

export const MakeApiCall = async (
  url,
  method = "get",
  data = null,
  withBearer = false,
  isFormData = false
) => {
  try {
    const headers = {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    };
    if (withBearer) {
      headers["Token"] = `${getToken()}`;
    }
    const response = await axiosInstance({
      method,
      url,
      data: data || null,
      headers,
    });
    return { status: true, data: response.data };
  } catch (error) {
    return error;
  }
};
