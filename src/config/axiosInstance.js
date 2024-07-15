import axios from "axios";
import { ENDPOINT } from "./common_config";

// const getToken = () => localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: ENDPOINT,
  timeout: 5000, // Default timeout set to 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// // Request interceptor to add the token to headers
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // const token = getToken();
//     // if (token) {
//     //   config.headers["Token"] = token;
//     // }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = "Something went wrong";
    if (error.code === "ECONNABORTED") {
      errorMessage = "Request Timed Out!";
    } else if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
    }
    return Promise.reject({
      status: false,
      message: errorMessage,
    });
  }
);

export default axiosInstance;
