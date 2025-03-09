import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../baseUrl";

const fetchReviews = async (courseId, lang = "en") => {
  const res = await fetch(`${baseUrl}courses/${courseId}/reviews?lang=${lang}`);
  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return res.json();
};

export const useReviews = (courseId, lang = "en") => {
  return useQuery({
    queryKey: ["reviews", courseId, lang],
    queryFn: () => fetchReviews(courseId, lang),
    staleTime: 60000, // 1 minute cache
  });
};
