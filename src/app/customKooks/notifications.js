import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../baseUrl";
import axios from "axios";

const fetchNotifications = async ({ lang = "ar" }) => {
  const response = await axios.get(`${baseUrl}notifications?lang=${lang}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const useFetchNotifications = ({ lang = "ar" } = {}) => {
  return useQuery({
    queryKey: ["notifications", lang], 
    queryFn: () => fetchNotifications({ lang }),
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
    retry: 2, // Retry failed requests 2 times
  });
};

export default useFetchNotifications;
