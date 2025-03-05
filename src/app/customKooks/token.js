import axios from "axios"; // Import axios
import Cookies from "js-cookie"; // Import js-cookie for managing cookies
import { baseUrl } from "../baseUrl"; // Your base URL

const axiosInstance = axios.create({
  baseURL: baseUrl, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("elmy_token"); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Bearer prefix if your API expects it
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;