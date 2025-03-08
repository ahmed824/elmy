import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '../baseUrl';  

// Fetch user statistics from the API
const fetchStatsUsers = async ({ lang = 'ar' }) => {
  const response = await fetch(`${baseUrl}home/stats-users?lang=${lang}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Custom hook to fetch and manage user statistics
const useStatsUsers = ({ lang = 'ar' } = {}) => {
  return useQuery({
    queryKey: ['statsUsers', lang], // Unique key for caching
    queryFn: () => fetchStatsUsers({ lang }), // Fetch function
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
    retry: 2, // Retry failed requests 2 times
  });
};

export default useStatsUsers;