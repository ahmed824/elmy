import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '../baseUrl';  

// Fetch most searched categories from the API
const fetchMostSearchedCategories = async ({ lang = 'ar', limit = 5 }) => {
  const response = await fetch(`${baseUrl}most-searched-categories?lang=${lang}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Custom hook to fetch and manage most searched categories
const useMostSearchedCategories = ({ lang = 'ar', limit = 5 } = {}) => {
  return useQuery({
    queryKey: ['mostSearchedCategories', lang, limit], // Unique key for caching
    queryFn: () => fetchMostSearchedCategories({ lang, limit }), // Fetch function
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
    retry: 2, // Retry failed requests 2 times
  });
};

export default useMostSearchedCategories;