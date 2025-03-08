// @/app/customKooks/authProfile.js
import { useQuery } from '@tanstack/react-query';
import axiosInstance from  '@/app/customKooks/token';
import Cookies from 'js-cookie';

const fetchUserProfile = async () => {
  const token = Cookies.get('elmy_token'); // Use consistent token key
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await axiosInstance.get('auth/profile?lang=ar');
  console.log('API Response:', response.data); // Debug API response
  return response.data;
};

export const useAuthProfile = () => {
  const hasToken = !!Cookies.get('elmy_token');
  console.log('Has token:', hasToken); // Debug token presence

  return useQuery({
    queryKey: ['userProfile'], // Unique key for caching
    queryFn: fetchUserProfile,
    enabled: hasToken, // Only run if token exists
    onSuccess: (data) => {
      console.log('User profile fetched successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to fetch user profile:', error.message || error);
    },
  });
};