// useReviews.js
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '../baseUrl';

const fetchReviews = async ({ lang = 'ar', limit = 5 }) => {
  const response = await fetch(`${baseUrl}reviews/home?lang=${lang}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const useReviews = ({ lang = 'ar', limit = 5 } = {}) => {
  return useQuery({
    queryKey: ['reviews', lang, limit], // Unique key for caching
    queryFn: () => fetchReviews({ lang, limit }), // Fetch function
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
    retry: 2, // Retry failed requests 2 times
  });
};

export default useReviews;