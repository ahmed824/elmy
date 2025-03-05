import { useMutation } from '@tanstack/react-query';
import axiosInstance from './token';  

const registerStudent = async (studentData) => {
  const response = await axiosInstance.post(
    'auth/register/student?lang=ar', // Endpoint relative to baseUrl
    studentData
  );
  return response.data; // Return the response data
};

export const useRegisterStudent = () => {
  return useMutation({
    mutationFn: registerStudent,
    onSuccess: (data) => {
      console.log('Student registered successfully:', data);
    },
    onError: (error) => {
      console.error('Registration failed:', error.response?.data || error.message);
    },
    onSettled: () => {
      console.log('Registration process completed');
    },
  });
};