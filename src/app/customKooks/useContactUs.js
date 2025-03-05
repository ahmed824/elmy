import { useMutation } from '@tanstack/react-query';
import { baseUrl } from '../baseUrl'; // Ensure this path is correct

const submitContactForm = async (formData) => {
    const response = await fetch(`${baseUrl}contact?lang=en`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

export const useContactUs = () => {
    return useMutation({
        mutationFn: submitContactForm, // Use `mutationFn` instead of passing the function directly
        onSuccess: (data) => {
            console.log('Form submitted successfully:', data);
        },
        onError: (error) => {
            console.error('Error submitting form:', error);
        },
    });
};