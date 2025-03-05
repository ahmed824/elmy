import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../baseUrl'; 

const fetchCategories = async () => {
  const response = await axios.get(`${baseUrl}categories?lang=ar`);
  return response.data;
};

export const useCat = () => {
  return useQuery({
    queryKey: ['categories'], 
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });
};
