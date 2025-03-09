import { useMutation } from '@tanstack/react-query';
import { baseUrl } from '../baseUrl';

const registerInstructor = async (formData, lang = 'ar') => {
  const response = await fetch(
    `${baseUrl}auth/register/instructor?lang=${lang}`,
    {
      method: 'POST',
      // Remove the Content-Type header to let the browser set it correctly with boundary for FormData
      body: formData, // Use the FormData object directly
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to register instructor');
  }

  return response.json();
};

export const useRegisterInstructor = (lang = 'ar') => {
  return useMutation({
    mutationFn: (formData) => registerInstructor(formData, lang),
  });
};