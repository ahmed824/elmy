import axiosInstance from "./token";
import { baseUrl } from "../baseUrl";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

// Function to handle logout
const logout = async (lang) => {
  try {
    // Make a request to the logout endpoint
    await axiosInstance.post(`${baseUrl}auth/logout/${lang}`);

    // Clear authentication tokens or user data
    Cookies.remove("elmy_token");

    // Optionally, you can redirect the user to the login page or home page
    router.push("/login");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to logout";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// Custom hook to use logout
export const useLogout = () => {
  return useMutation({
    mutationFn: (lang) => logout(lang),
    onSuccess: () => {
      console.log("Logged out successfully");
    },
    onError: (error) => {
      const errorMessage = error.message || "Failed to logout";
      toast.error(errorMessage);
    },
  });
};
