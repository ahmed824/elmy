"use client";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useRegisterStudent } from '@/app/customKooks/useRegStud';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const PhoneNumberInput = React.memo(({ field, form, ...props }) => {
  const { name, value } = field;
  const { touched, errors, setFieldValue } = form;
  const error = touched[name] && errors[name];

  const handleChange = (phone, country) => {
    setFieldValue(name, phone || '');
    setFieldValue('phoneCountryCode', country ? `+${country.dialCode}` : '');
  };

  return (
    <div className="flex flex-col">
      <PhoneInput
        country="sa"
        value={value}
        onChange={handleChange}
        inputClass={`w-full px-3 py-3 bg-[#F4F4F4] text-[#121D2F] rounded-3xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        buttonClass="!bg-[#F4F4F4] !border-none"
        dropdownClass="!text-left !rounded-lg shadow-lg"
        containerClass={`relative mt-1 border rounded-3xl flex focus:outline-none focus:ring-2 focus:ring-purple-500 ${
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
});

const inputClass = (hasError) =>
  `mt-1 p-3 border bg-[#F4F4F4] rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
    hasError ? 'border-red-500' : 'border-gray-300'
  }`;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: registerStudent, isPending } = useRegisterStudent();
  const router = useRouter();

  const initialValues = {
    name: '',
    phone: '',
    phoneCountryCode: '+966',
    email: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('يرجى إدخال الاسم الكامل'),
    phone: Yup.string()
      .required('يرجى إدخال رقم الجوال')
      .matches(/^\+?\d+$/, 'رقم الجوال غير صالح'),
    email: Yup.string()
      .email('يرجى إدخال بريد إلكتروني صالح')
      .required('يرجى إدخال البريد الإلكتروني'),
    password: Yup.string()
      .min(8, 'كلمة المرور يجب أن تتكون من 8 أحرف على الأقل')
      .required('يرجى إدخال كلمة المرور'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'كلمات المرور غير متطابقة')
      .required('يرجى تأكيد كلمة المرور'),
    termsAgreed: Yup.boolean()
      .oneOf([true], 'يجب الموافقة على الشروط والأحكام للمتابعة')
      .required('يجب الموافقة على الشروط والأحكام للمتابعة'),
  });

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    let phoneNumber = '';

    try {
      if (values.phone) {
        const countryCodeDigits = values.phoneCountryCode.replace('+', '').length;
        if (values.phone.startsWith('+')) {
          phoneNumber = values.phone.substring(countryCodeDigits + 1);
        } else {
          phoneNumber = values.phone.substring(countryCodeDigits);
        }
        if (!phoneNumber) {
          phoneNumber = values.phone.replace(/^\+?\d+/, '');
        }
      }
    } catch (error) {
      phoneNumber = values.phone;
    }

    const payload = {
      name: values.name,
      email: values.email,
      phone_country_code: values.phoneCountryCode,
      phone_number: phoneNumber,
      password: values.password,
      password_confirmation: values.confirmPassword,
      agree_terms: values.termsAgreed,
    };

    // console.log("Registration payload:", payload);

    registerStudent(payload, {
      onSuccess: (response) => {
        const token = response.data?.token; // Safely access token
        if (token) {
          Cookies.set('elmy_token', token, { expires: 7 });
          toast.success('تم إنشاء الحساب بنجاح');
          resetForm();
          router.push('/');
        } else {
          toast.error('فشل في اتمام التسجيل');
        }
      },
      onError: (error) => {
        // Handle API error response
        const errorData = error.response?.data;
        if (errorData && errorData.code === 422) {
          // Handle validation errors
          const validationErrors = errorData.data || {};
          Object.values(validationErrors).forEach((errorArray) => {
            errorArray.forEach((msg) => toast.error(msg)); // Show each error in a toast
          });
        } else {
          // Fallback to general error message
          const errorMessage = errorData?.message || 'حدث خطأ أثناء إنشاء الحساب';
          toast.error(errorMessage);
        }
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-[38px] font-medium text-center text-[#121D2F] mb-6">قم بالتسجيل وابدأ التعلم</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            {/* Full Name Field */}
            <div className="flex flex-col">
              <label className="text-[#121D2F] font-medium text-lg">الاسم الكامل *</label>
              <Field
                type="text"
                name="name"
                className={inputClass(errors.name && touched.name)}
                placeholder="الاسم الكامل"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Email and Phone Number Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[#121D2F] font-medium text-lg">البريد الإلكتروني *</label>
                <Field
                  type="email"
                  name="email"
                  className={inputClass(errors.email && touched.email)}
                  placeholder="البريد الإلكتروني"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#121D2F] font-medium text-lg">رقم الجوال *</label>
                <Field name="phone" component={PhoneNumberInput} />
                <Field type="hidden" name="phoneCountryCode" />
              </div>
            </div>

            {/* Password and Confirm Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col relative">
                <label className="text-[#121D2F] font-medium text-lg">كلمة المرور *</label>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={inputClass(errors.password && touched.password)}
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

              <div className="flex flex-col relative">
                <label className="text-[#121D2F] font-medium text-lg">تأكيد كلمة المرور *</label>
                <Field
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className={inputClass(errors.confirmPassword && touched.confirmPassword)}
                  placeholder="تأكيد كلمة المرور"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 left-5 top-8 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <Field
                  type="checkbox"
                  name="termsAgreed"
                  id="termsAgreed"
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
              </div>
              <div className="mr-3 text-sm">
                <label htmlFor="termsAgreed" className="text-[#121D2F]">
                  بالتسجيل فإنك توافق على{' '}
                  <Link href="/terms" className="text-purple-600 hover:underline">
                    الشروط والأحكام
                  </Link>
                </label>
                <ErrorMessage name="termsAgreed" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting || isPending}
                className="bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-md hover:scale-105 transition-transform w-full justify-center"
              >
                <span>{isSubmitting || isPending ? 'جاري التسجيل...' : 'إنشاء حساب'}</span>
                <FaArrowLeft className="text-sm" />
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center text-[#121D2F] mt-4">
              لديك حساب بالفعل؟{' '}
              <Link href="/login" className="text-purple-600 hover:underline">
                تسجيل الدخول
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}