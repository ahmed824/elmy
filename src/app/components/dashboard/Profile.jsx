"use client";

import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRef, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import axiosInstance from "@/app/customKooks/token";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import imgIcon from "@/images/dashboard/feather_image.svg";
import PhoneNumberInput from "../shared/PhoneNumberInput/PhoneNumberInput";
import Select from "react-select";
import countries from "world-countries";

export default function Profile() {
  const router = useRouter();

  const [initialValues, setInitialValues] = useState({
    profilePhoto: "",
    cv: "",
    certificate: "",
    full_name: "",
    mobile: "",
    email: "",
    gender: "",
    password: "",
    confirm_password: "",
    nationality: "",
    address: "",
    university: "",
    department: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/path/to/profile/data");
        setInitialValues(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };
    fetchData();
  }, []);

  const validationSchema = Yup.object({
    full_name: Yup.string().required("مطلوب"),
    mobile: Yup.string().required("مطلوب"),
    email: Yup.string().email("بريد إلكتروني غير صالح").required("مطلوب"),
    gender: Yup.string().required("مطلوب"),
    password: Yup.string().min(6, "قصير جدًا"),
    confirm_password: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "يجب أن تتطابق كلمات المرور"
    ),
    nationality: Yup.string().required("مطلوب"),
    address: Yup.string().required("مطلوب"),
    university: Yup.string().required("مطلوب"),
    department: Yup.string().required("مطلوب"),
  });

  const fileRefs = {
    profilePhoto: useRef(),
    cv: useRef(),
    certificate: useRef(),
  };

  const handleFileChange = (field, event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "application/pdf" || file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFieldValue(field, reader.result); // Save Base64 to Formik state
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("الملف يجب أن يكون صورة أو PDF");
      }
    }
  };

  const handleDeleteImage = (field, setFieldValue) => {
    setFieldValue(field, ""); // Clear Base64 image
  };

  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "6px", // Match input padding
      backgroundColor: "#f3f4f6", // bg-gray-100
      borderRadius: "9999px", // rounded-full
      border: "1px solid #d1d5db", // border-gray-300
      boxShadow: state.isFocused ? "0 0 0 2px #7c3aed" : "none", // focus:ring-primary-purble
      outline: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af", // Placeholder text color
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#111827", // Text color
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px", // Rounded dropdown
      backgroundColor: "#ffffff",
      border: "1px solid #d1d5db",
    }),
    option: (provided, { isFocused }) => ({
      ...provided,
      backgroundColor: isFocused ? "#f3f4f6" : "#ffffff", // bg-gray-100 hover effect
      color: "#111827",
      cursor: "pointer",
    }),
  };
  return (
    <div className="p-4 md:p-8 bg-white shadow-lg rounded-xl w-full max-w-4xl mx-auto sm:mx-4">
      <div className="my-4 border-b border-b-gray-300">
        <h2 className="text-xl md:text-2xl m-0 font-semibold mb-4 md:mb-6 text-right text-gray-800">
          بيانات الحساب
        </h2>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await axiosInstance.post("/path/to/update/profile", values);
            toast.success("تم تحديث البيانات بنجاح");
            router.push("/dashboard");
          } catch (error) {
            toast.error("فشل التحديث");
            console.error("Error:", error);
          } finally {
            setSubmitting(false);
          }
        }}
        enableReinitialize
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="grid gap-4 md:gap-6">
            {/* Image Upload Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { field: "profilePhoto", label: "صورة شخصية" },
                { field: "cv", label: "سيرة ذاتية" },
                { field: "certificate", label: "شهادة" },
              ].map(({ field, label }) => (
                <div key={field} className="flex flex-col items-center">
                  <label className="mb-2 text-gray-700">{label}</label>
                  <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px]">
                    {values[field] ? (
                      <div className="relative w-full h-full">
                        {values[field].startsWith("data:image/") ? (
                          <Image
                            src={values[field]} // Base64 preview
                            alt="Preview"
                            width={150}
                            height={150}
                            className="w-full h-full object-cover rounded-lg"
                            unoptimized // Required for Base64 images
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                            <span className="text-sm text-gray-600">PDF File</span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteImage(field, setFieldValue)
                          }
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 md:p-2 rounded-full"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileRefs[field].current.click()}
                        className="cursor-pointer w-full h-full border border-gray-400 flex flex-col items-center justify-center rounded-lg bg-gray-100"
                      >
                        <Image
                          src={imgIcon}
                          alt="Upload"
                          width={30}
                          height={30}
                        />
                        <span className="text-sm text-gray-600">
                          إضافة ملف
                        </span>
                      </div>
                    )}
                    <input
                      ref={fileRefs[field]}
                      type="file"
                      className="hidden"
                      onChange={(event) =>
                        handleFileChange(field, event, setFieldValue)
                      }
                      accept=".pdf,image/*"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                { name: "full_name", placeholder: "الاسم" },
                { name: "phone_number", placeholder: "رقم الهاتف" },
                { name: "email", placeholder: "البريد الإلكتروني" },
                { name: "gender", placeholder: "الجنس" },
                { name: "password", placeholder: "كلمة المرور" },
                { name: "confirm_password", placeholder: "تأكيد كلمة المرور" },
                { name: "nationality", placeholder: "الجنسية" },
                { name: "address", placeholder: "العنوان" },
                { name: "university", placeholder: "الجامعة" },
                { name: "department", placeholder: "القسم" },
              ].map(({ name, placeholder }) => {
                if (name === "phone_number") {
                  return (
                    <div className="flex flex-col">
                      <Field name="phone" component={PhoneNumberInput} />
                      <Field type="hidden" name="phoneCountryCode" />
                    </div>
                  );
                } else if (name === "nationality") {
                  return (
                    <div className="flex flex-col">
                      <Field name="nationality">
                        {({ field, form }) => (
                          <Select
                            options={countryOptions}
                            styles={customStyles}
                            placeholder="اختر الجنسية"
                            value={countryOptions.find(
                              (option) => option.value === field.value
                            )}
                            onChange={(option) =>
                              form.setFieldValue(field.name, option.value)
                            }
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="nationality"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={name} className="flex flex-col">
                      <Field
                        type="text"
                        name={name}
                        placeholder={placeholder}
                        className="p-2 md:p-3 my-1 bg-gray-100 border border-gray-300 rounded-full w-full outline-none focus:ring-2 focus:ring-primary-purble"
                      />
                      <ErrorMessage
                        name={name}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  );
                }
              })}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-start gap-4 mt-6">
              <button
                type="submit"
                className="px-4 py-2 md:px-6 md:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                disabled={isSubmitting}
              >
                حفظ التغييرات
              </button>
              <button
                type="button"
                className="px-4 py-2 md:px-6 md:py-2 bg-white text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-100 transition"
                onClick={() => router.push("/dashboard")}
              >
                إلغاء
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}