import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../baseUrl";

const fetchInstructors = async (limit, lang) => {
  const API_URL = `${baseUrl}home/popular-instructors?lang=${lang}&limit=${limit}`;
  const response = await axios.get(API_URL);
  return response.data;
};

export const useInstructors = (limit = 3, lang = "ar") => {
  return useQuery({
    queryKey: ["popularInstructors", limit, lang], // Cache separate data for each limit & lang
    queryFn: () => fetchInstructors(limit, lang),
    staleTime: 60000, // Cache data for 1 minute
  });
};
