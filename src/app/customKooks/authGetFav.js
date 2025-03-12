import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../baseUrl";
import axiosInstance from "./token";

// Function to get favorite courses
export const getFavoriteCourses = async (lang = "en") => {
  try {
    const response = await axiosInstance.get(
      `${baseUrl}student/favorites?lang=${lang}`
    );
    return response.data.data; // Accessing "data" inside the response
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch favorite courses"
    );
  }
};

// Custom hook to use favorite courses
export const useFavoriteCourses = (lang) => {
  return useQuery({
    queryKey: ["favoriteCourses", lang],
    queryFn: () => getFavoriteCourses(lang),
  });
};
