import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../baseUrl";
import axiosInstance from "./token";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Function to get student courses
export const getStudentCourses = async (lang = "en") => {
  try {
    const response = await axiosInstance.get(`${baseUrl}student/courses?lang=${lang}`);
    return response.data.data; // Accessing "data" inside the response
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch student courses");
  }
};

// Custom hook to use student courses
export const useStudentCourses = (lang) => {
  return useQuery({
    queryKey: ["studentCourses", lang],
    queryFn: () => getStudentCourses(lang),
    onError: (error) => {
      const errorMessage = error.message || "Failed to fetch student courses";
      toast.error(errorMessage);
    },
  });
};