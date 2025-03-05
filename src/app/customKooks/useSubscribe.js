import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { toast } from "react-toastify"; // Import toast here

const subscribeNewsletter = async (email) => {
  const response = await axios.post(`${baseUrl}subscribe`, { email });
  return response.data;
};

export const useSubscribe = () => {
  return useMutation({
    mutationFn: subscribeNewsletter, // Use `mutationFn` instead of passing the function directly
    onSuccess: (data) => {
      // Show success toast with the message from the API response
      toast.success(data.message || "تم الاشتراك بنجاح!");
    },
    onError: (error) => {
      // Show error toast with the message from the API response
      toast.error(error.response?.data?.message || "حدث خطأ، حاول مرة أخرى.");
    },
  });
};