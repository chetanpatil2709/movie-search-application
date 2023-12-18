import axios from "axios";
import { API_URL } from "../constant";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { accept: "application/json" },
});
export default axiosInstance;
