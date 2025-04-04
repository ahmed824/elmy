import axios from "axios"; // Import axios
import Cookies from "js-cookie"; // Import js-cookie for managing cookies
import { baseUrl } from "../baseUrl"; // Your base URL

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Fetch the XSRF token and store it in cookies


// Ensure the XSRF token is fetched before making any requests

// Add a request interceptor to include the XSRF token in the headers
axiosInstance.interceptors.request.use(
  async (config) => {
     // Ensure the XSRF token is fetched

    const token = Cookies.get("elmy_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Bearer prefix if your API expects it
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-redirect on session expiration
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 || error.response?.status === 419) {
//       window.location.href = "/login"; // Redirect to login page
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
