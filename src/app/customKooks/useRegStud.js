import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./token";
import { baseUrl } from "../baseUrl";

const registerStudent = async (studentData) => {
  const response = await axiosInstance.post(
    `${baseUrl}auth/register/student?lang=ar`, // Endpoint relative to baseUrl
    studentData
  );
  return response.data; // Return the response data
};

export const useRegisterStudent = () => {
  return useMutation({
    mutationFn: registerStudent,
    onSuccess: (data) => {
      console.log("Student registered successfully:", data);
    },
    onError: (error) => {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
    },
    onSettled: () => {
      console.log("Registration process completed");
    },
  });
};
