import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

const fetchCourses = async (params) => {
    const queryParams = new URLSearchParams(params).toString();
    const { data } = await axios.get(`${baseUrl}courses?${queryParams}`);
    return data;
};

export const useCourses = (filters) => {
    return useQuery({
        queryKey: ['courses', filters],
        queryFn: () => fetchCourses(filters),
        staleTime: 1000 * 60 * 5, // 5 minutes,
    });
};



// const filters = {
//     lang: 'en', // ar|en
//     category_id: '',  //
//     level: '', //beginner,intermediate,advanced
//     per_page: 10,  //min:1|max:50
//     min_price: '',   //numeric|min:0
//     max_price: '',  //numeric|min:0
//     min_rating: '',   //min:0|max:5
//     search: '',
//     sort_by: ''   //price_asc,price_desc,rating_desc,latest
// };

