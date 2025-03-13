"use client";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'; 
import React from 'react';

const PhoneNumberInput = React.memo(({ field, form, ...props }) => {
  const { name, value } = field;
  const { touched, errors, setFieldValue } = form;
  const error = touched[name] && errors[name];

  const handleChange = (phone, country) => {
    setFieldValue(name, phone || "");
    setFieldValue("phoneCountryCode", country ? `+${country.dialCode}` : "");
  };

  return (
    <div className="flex flex-col">
      <PhoneInput
        country="sa"
        value={value}
        onChange={handleChange}
        inputClass={`w-full px-3 py-3 bg-[#F4F4F4] text-[#121D2F] rounded-3xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        buttonClass="!bg-[#F4F4F4] !border-none"
        dropdownClass="!text-left !rounded-lg shadow-lg"
        containerClass={`relative mt-1 border rounded-3xl flex focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          error ? "border-red-500" : "border-gray-300"
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
export default PhoneNumberInput;
