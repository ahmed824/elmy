import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./token"; // Adjust path to your token.js
import { baseUrl } from "../baseUrl";

// Function to fetch the cart
const fetchCart = async (lang = "en") => {
  const response = await axiosInstance.get(`${baseUrl}cart?lang=${lang}`);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to fetch cart");
  }

  return response.data;
};

// Custom hook to get cart data
export const useGetCart = (lang = "en") => {
  return useQuery({
    queryKey: ["cart", lang],
    queryFn: () => fetchCart(lang),
    staleTime: 60000, // 1 minute cache
  });
};