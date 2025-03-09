import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./token"; // Import your axios instance with token interceptor
import { baseUrl } from "../baseUrl";

// Function to add a review
const addReview = async ({ courseId, rating, comment, lang = "en" }) => {
  const response = await axiosInstance.post(`${baseUrl}courses/${courseId}/reviews?lang=${lang}`, {
    rating,
    comment,
  });

  // Check if the response is successful (axios throws for non-2xx status codes)
  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to add review");
  }

  return response.data;
};

// Custom hook to handle review submission
export const useAddReview = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rating, comment, lang }) =>
      addReview({ courseId, rating, comment, lang }),
    onSuccess: () => {
      // Invalidate the reviews query to refetch the updated list
      queryClient.invalidateQueries(["reviews", courseId, "en"]);
    },
    onError: (error) => {
      console.error("Error adding review:", error.message);
    },
  });
};