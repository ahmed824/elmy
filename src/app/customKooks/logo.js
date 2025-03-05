import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../baseUrl"; // Ensure this path is correct

// Function to fetch logo data from the API
const fetchLogo = async () => {
  const response = await axios.get(`${baseUrl}settings/logo`);
  return response.data;
};

// Custom hook to fetch logo data
export const useLogo = () => {
  return useQuery({
    queryKey: ["logo"], // Unique key for the query
    queryFn: fetchLogo, // Function to fetch the data
    onError: (error) => {
      console.error("Error fetching logo:", error);
    },
  });
};