import axios from "axios"; // Import axios
import Cookies from "js-cookie"; // Import js-cookie for managing cookies
import { baseUrl } from "../baseUrl"; // Your base URL

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch the XSRF token and store it in cookies
const fetchXsrfToken = async () => {
  try {
    await axios.get("https://app.sci.com.sa/sanctum/csrf-cookie", {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Failed to fetch XSRF token:", error);
  }
};

// Ensure the XSRF token is fetched before making any requests
const ensureXsrfToken = async () => {
  const xsrfToken = Cookies.get("XSRF-TOKEN");
  if (!xsrfToken) {
    await fetchXsrfToken();
  }
};

// Add a request interceptor to include the XSRF token in the headers
axiosInstance.interceptors.request.use(
  async (config) => {
    await ensureXsrfToken(); // Ensure the XSRF token is fetched

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
