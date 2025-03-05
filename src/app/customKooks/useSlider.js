// useSlider.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../baseUrl'; // Adjust the import path as needed

// Function to fetch sliders data
const fetchSliders = async (lang) => {
  const response = await axios.get(`${baseUrl}sliders?lang=${lang}`);
  return response.data; 
};

// Custom hook to use the sliders API
export const useSlider = (lang = 'en') => {
  return useQuery({
    queryKey: ['sliders', lang], 
    queryFn: () => fetchSliders(lang), 
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    onError: (error) => {
      console.error('Error fetching sliders:', error.response?.data || error.message);
    },
  });
};