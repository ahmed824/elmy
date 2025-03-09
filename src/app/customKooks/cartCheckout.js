import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./token"; // Adjust path to your token.js
import { baseUrl } from "../baseUrl";
import { toast } from "react-toastify"; // For user feedback

// Function to perform cart checkout with coupon
const checkoutCart = async ({ coupon }) => {
  const response = await axiosInstance.post(`${baseUrl}cart/checkout`, {
    coupon: coupon || "", // Send coupon code, default to empty string if not provided
  });

  if (!response.data.success) {
    throw new Error(response.data.message || "فشل في إتمام عملية الدفع");
  }

  return response.data;
};

// Custom hook to handle cart checkout
export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ coupon }) => checkoutCart({ coupon }), // Pass coupon to mutation function
    onSuccess: (data) => {
      // Invalidate cart-related queries to refresh the cart state
      queryClient.invalidateQueries(["cart"]);
      // Provide user feedback
      toast.success(data.message || "تم إتمام عملية الدفع بنجاح");
    },
    onError: (error) => {
      // Log error to console for debugging
      console.error("Error during checkout:", error.message);
      // Notify user of the error
      toast.error(error.message || "حدث خطأ أثناء إتمام عملية الدفع");
    },
  });
};