import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./token"; // Adjust path to your token.js
import { baseUrl } from "../baseUrl";

// Function to add a course to the cart
const addToCart = async ({ courseId, lang = "ar" }) => {
  const response = await axiosInstance.post(`${baseUrl}cart/checkout`, {
    course_id: courseId,
  });

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to add course to cart");
  }

  return response.data;
};

// Custom hook to handle adding to cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, lang }) => addToCart({ courseId, lang }),
    onSuccess: () => {
      // Optionally invalidate a cart query if you have one
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error("Error adding to cart:", error.message);
    },
  });
};