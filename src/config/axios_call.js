import axios from "axios";
import { ENDPOINT } from "./common_config";
import axiosInstance from "./axios_interceptors";
import { toast } from "react-toastify";

const getToken = () => localStorage.getItem("token");

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
    return response;
  } catch (error) {
    return error;
  }
};
