import { useMutation } from '@tanstack/react-query';
import { baseUrl } from '../baseUrl';

const registerInstructor = async ({ instructorData, lang = 'ar' }) => {
  const response = await fetch(
    `${baseUrl}/auth/register/instructor?lang=${lang}`,  
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(instructorData),  
    }
  );

  if (!response.ok) {
    throw new Error('Failed to register instructor');
  }

  return response.json();  
};

export const useRegisterInstructor = (lang = 'ar') => {
  return useMutation({
    mutationFn: (instructorData) =>
      registerInstructor({ instructorData, lang }),  
  });
};


// payload :
// name
// email
// phone_country_code
// phone_number
// password
// password_confirmation
// cv   //must be pdf
// certificate    //pdf,jpg,jpeg,png
// bio
// specialization
// university
// department
// nationality
// gender  //male,female
// address
// agree_terms