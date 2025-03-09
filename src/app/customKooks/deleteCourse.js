import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./token";  
import { baseUrl } from "../baseUrl";

const deleteCourse = async ({ cartItemId, lang = "en" }) => {
  const response = await axiosInstance.delete(`${baseUrl}cart/remove?lang=${lang}`, {
    data: { cart_item_id: cartItemId },  
  });

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to remove course from cart");
  }

  return response.data;
};

// Custom hook to handle course removal
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartItemId, lang }) => deleteCourse({ cartItemId, lang }),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error("Error removing course from cart:", error.message);
    },
  });
};