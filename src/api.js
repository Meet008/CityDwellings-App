import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
