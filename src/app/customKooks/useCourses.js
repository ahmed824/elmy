import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../baseUrl";

const fetchCourses = async ({ queryKey }) => {
  const [, lang, filter] = queryKey;
  const response = await axios.get(
    `${baseUrl}home-page/courses?lang=${lang}&filter=${filter}`
  );
  return response.data;
};

export const useCourses = ({ lang = "ar", filter = "new" }) => {
  return useQuery({
    queryKey: ["courses", lang, filter],
    queryFn: fetchCourses,
    staleTime: 1000 * 60 * 5,
  });
};
