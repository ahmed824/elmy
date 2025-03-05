import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../baseUrl";

export const getCourseById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}courses/${id}`);
    return response.data.data; // Accessing "data" inside the response
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch course");
  }
};

export const useCourse = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
    enabled: !!id, // Ensures query runs only if id is valid
  });
};
