"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axiosInstance from "@/app/customKooks/token";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

// Custom Phone Input Component
const PhoneNumberInput = ({ field, form, ...props }) => {
  const { name, value } = field;
  const { touched, errors, setFieldValue } = form;
  const error = touched[name] && errors[name];

  const handleChange = (phone, countryData) => {
    const countryCode = `+${countryData.dialCode}`;
    let phoneNumber = phone.startsWith(countryCode)
      ? phone.slice(countryCode.length)
      : phone;

    setFieldValue(name, phone || "");
    setFieldValue("phone_country_code", countryCode);
    setFieldValue("phone_number", phoneNumber);
  };

  return (
    <div className="flex flex-col">
      <PhoneInput
        country="sa"
        value={value}
        onChange={handleChange}
        inputClass={`w-full p-3 bg-[#F4F4F4] text-right text-[#121D2F] placeholder-gray-400 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        buttonClass="bg-[#F4F4F4]"
        dropdownClass="text-right"
        containerClass={`mt-1 border rounded-3xl flex flex-row-reverse focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={props.placeholder}
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
  const { t } = useTranslation();

  const initialValues = {
    phone: "",
    phone_country_code: "",
    phone_number: "",
    password: "",
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .required(t("login.phoneRequired"))
      .matches(/^\+?\d+$/, t("login.phoneInvalid")),
    password: Yup.string()
      .min(8, t("login.passwordMin"))
      .required(t("login.passwordRequired")),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      const payload = {
        phone_country_code: values.phone_country_code,
        phone_number: values.phone_number,
        password: values.password,
      };

      const response = await axiosInstance.post("auth/login", payload);
      const token = response.data?.data?.token;

      Cookies.set("elmy_token", token, { expires: 7 });

      toast.success(response.data.message || t("login.successMessage"));
      router.push("/");
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || t("login.errorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-[38px] font-medium text-center text-[#121D2F] mb-6">
        {t("login.title")}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            {/* Phone Number Field */}
            <div className="flex flex-col">
              <label className="text-[#121D2F] font-medium text-lg">
                {t("login.phoneLabel")} *
              </label>
              <Field name="phone" component={PhoneNumberInput} placeholder={t("login.phonePlaceholder")} />
              <Field name="phone_country_code" type="hidden" />
              <Field name="phone_number" type="hidden" />
            </div>

            {/* Password Field */}
            <div className="flex flex-col relative">
              <label className="text-[#121D2F] font-medium text-lg">
                {t("login.passwordLabel")} *
              </label>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                className={`mt-1 p-3 border bg-[#F4F4F4] rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.password && touched.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={t("login.passwordPlaceholder")}
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
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="rememberMe" className="text-[#6B7385] mr-2">
                  {t("login.rememberMe")}
                </label>
              </div>
              <Link href="/forgot-password" className="text-purple-600 hover:underline">
                {t("login.forgotPassword")}
              </Link>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-md hover:scale-105 transition-transform w-full justify-center"
              >
                <span>{isLoading ? t("login.loading") : t("login.submit")}</span>
                <FaArrowLeft className="text-sm" />
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center text-[#121D2F] mt-4">
              {t("login.noAccount")}{" "}
              <Link href="/register" className="text-purple-600 hover:underline">
                {t("login.register")}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
