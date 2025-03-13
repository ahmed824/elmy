import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '../baseUrl';
import axiosInstance from './token';

const fetchStudentStatus = async () => {
    const lang = localStorage.getItem("i18nextLng");
    const { data } = await axiosInstance.get(`${baseUrl}student/dashboard?lang=${lang}`);
    console.log(data.data); // Log the response data
    return data.data; // Returning only the relevant `data` field
};

export const useStudentStatus = () => {
    return useQuery({
        queryKey: ['studentStatus'],
        queryFn: fetchStudentStatus,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
