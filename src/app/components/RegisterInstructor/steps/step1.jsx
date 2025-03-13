"use client";
import React from "react";
import { Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberInput = ({ field, form }) => {
    const { name, value } = field;
    const { touched, errors, setFieldValue } = form;
    const error = touched[name] && errors[name];

    const handleChange = (phone, country) => {
        setFieldValue(name, phone || "");
        setFieldValue("phone_country_code", country ? `+${country.dialCode}` : "");
    };

    return (
        <div className="flex flex-col">
            <PhoneInput
                country="sa"
                value={value}
                onChange={handleChange}
                inputClass="w-full px-3 py-3 bg-[#F4F4F4] text-[#121D2F] rounded-[50px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                buttonClass="!bg-[#F4F4F4] !border-none"
                dropdownClass="!text-left !rounded-lg shadow-lg"
                containerClass={`relative mt-1 border rounded-[50px] flex focus:outline-none focus:ring-2 focus:ring-purple-500 ${error ? "border-red-500" : "border-gray-300"
                    }`}
                placeholder="رقم الجوال"
                enableSearch
                countryCodeEditable={false}
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
};

const Step1 = ({ nextStep }) => (
    <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">سجل كمدرب الآن</h2>
        <div className="space-y-4 sm:space-y-6">
            <div>
                <label className="block text-gray-700 text-sm sm:text-base">الاسم الكامل</label>
                <Field
                    name="name"
                    className="w-full p-2 sm:p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
                    placeholder="الاسم الكامل"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
                <label className="block text-gray-700 text-sm sm:text-base">البريد الإلكتروني</label>
                <Field
                    name="email"
                    type="email"
                    className="w-full p-2 sm:p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
                    placeholder="البريد الإلكتروني"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
                <label className="block text-gray-700 text-sm sm:text-base">رقم الجوال</label>
                <Field name="phone_number" component={PhoneNumberInput} />
                <Field type="hidden" name="phone_country_code" />
            </div>
            <button
                type="button"
                onClick={nextStep}
                className="mt-4 sm:mt-6 w-full bg-purple-600 text-white p-2 sm:p-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
                التالي
            </button>
        </div>
    </div>
);

export default Step1;