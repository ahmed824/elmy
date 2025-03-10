import { useMutation } from '@tanstack/react-query';
import { baseUrl } from '../baseUrl';
import { toast } from 'react-toastify';
import axiosInstance from './token';

const addToFavorites = async (courseId) => {
  const response = await axiosInstance.post(`${baseUrl}student/favorites/${courseId}?lang=en`);
  return response.data;
};

const useAddToFavorites = () => {
  return useMutation({
    mutationFn: addToFavorites,
    onSuccess: (data) => {
      toast.success('Post added to favorites successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log('Post added to favorites successfully!', data);
    },
    onError: (error) => {
      toast.error('Error adding post to favorites. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Error adding post to favorites:', error);
    },
  });
};

export default useAddToFavorites;