"use client";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axiosInstance from '@/app/customKooks/token';
import Cookies from 'js-cookie';

// Custom PhoneInput Component
const PhoneNumberInput = ({ field, form, ...props }) => {
  const { name, value } = field;
  const { touched, errors, setFieldValue } = form;
  const error = touched[name] && errors[name];

  const handleChange = (phone, countryData) => {
    const countryCode = `+${countryData.dialCode}`; // e.g., "+966"
    let phoneNumber = phone;

    // Remove the country code from phoneNumber
    if (phoneNumber.startsWith(countryCode)) {
      phoneNumber = phoneNumber.slice(countryCode.length); // e.g., "123123333"
    } else if (phoneNumber.startsWith(countryData.dialCode)) {
      phoneNumber = phoneNumber.slice(countryData.dialCode.length); // Handle case without "+"
    }

    setFieldValue(name, phone || ''); // Full phone number for display/validation
    setFieldValue('phone_country_code', countryCode); // e.g., "+966"
    setFieldValue('phone_number', phoneNumber); // e.g., "123123333"
  };

  return (
    <div className="flex flex-col">
      <PhoneInput
        country="sa"
        value={value}
        onChange={handleChange}
        inputClass={`w-full p-3 bg-[#F4F4F4] text-right text-[#121D2F] placeholder-gray-400 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        buttonClass="bg-[#F4F4F4]"
        dropdownClass="text-right"
        containerClass={`mt-1 border rounded-3xl flex flex-row-reverse focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="رقم الجوال"
        enableSearch
        countryCodeEditable={false}
        {...props}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default function LogIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const initialValues = {
    phone: '',
    phone_country_code: '',
    phone_number: '',
    password: '',
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .required('يرجى إدخال رقم الجوال')
      .matches(/^\+?\d+$/, 'رقم الجوال غير صالح'),
    password: Yup.string()
      .min(8, 'كلمة المرور يجب أن تتكون من 8 أحرف على الأقل')
      .required('يرجى إدخال كلمة المرور'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      // Prepare payload with separated phone_country_code and phone_number
      const payload = {
        phone_country_code: values.phone_country_code, // e.g., "+966"
        phone_number: values.phone_number,             // e.g., "123123333"
        password: values.password,
      };

      console.log('Payload:', payload); // Debugging: Check the payload

      const response = await axiosInstance.post('auth/login', payload);
      const message = response.data;
      const token = response.data.data.token;
      // Store token in cookies
      Cookies.set('elmy_token', token, { expires: 7 });

      toast.success(message || 'تم تسجيل الدخول بنجاح');

      // Redirect to home page
      router.push('/');

      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-[38px] font-medium text-center text-[#121D2F] mb-6">تسجيل الدخول</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            {/* Phone Number Field */}
            <div className="flex flex-col">
              <label className="text-[#121D2F] font-medium text-lg">رقم الجوال *</label>
              <Field name="phone" component={PhoneNumberInput} />
              {/* Hidden fields for country code and phone number */}
              <Field name="phone_country_code" type="hidden" />
              <Field name="phone_number" type="hidden" />
            </div>

            {/* Password Field with Eye Icon */}
            <div className="flex flex-col relative">
              <label className="text-[#121D2F] font-medium text-lg">كلمة المرور *</label>
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                className={`mt-1 p-3 border bg-[#F4F4F4] rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="كلمة المرور"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-5 top-8 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between mt-4">
              <div>
                <div className="flex items-center h-5">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="rememberMe" className="text-[#6B7385] mr-2">
                    تذكرني
                  </label>
                </div>
              </div>
              <Link href="/forgot-password" className="text-purple-600 hover:underline">
                نسيت كلمة المرور!
              </Link>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-md hover:scale-105 transition-transform w-full justify-center"
              >
                <span>{isLoading ? 'جاري التسجيل...' : 'تسجيل الدخول'}</span>
                <FaArrowLeft className="text-sm" />
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center text-[#121D2F] mt-4">
              ليس لديك حساب؟{' '}
              <Link href="/register" className="text-purple-600 hover:underline">
                تسجيل جديد
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}