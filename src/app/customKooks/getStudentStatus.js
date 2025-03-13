import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

const fetchStudentStatus = async () => {
    const { data } = await axios.get(`${baseUrl}student/dashboard?lang=en`);
    return data.data; // Returning only the relevant `data` field
};

export const useStudentStatus = () => {
    return useQuery({
        queryKey: ['studentStatus'],
        queryFn: fetchStudentStatus,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
