"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaArrowLeft } from "react-icons/fa6";
import { useContactUs } from "../customKooks/useContactUs";
import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications
import BreadCramp from "../components/shared/breadCramp/BreadCramp";

export default function ContactPage() {
    const { mutate: submitForm, isLoading } = useContactUs(); // Use the useContactUs hook

    const initialValues = {
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("يرجى إدخال الاسم الكامل"),
        phone: Yup.string()
        .matches(/^01[0-2,5][0-9]{8}$/, "رقم الجوال يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015 ويتكون من 11 رقمًا")
        .required("يرجى إدخال رقم الجوال"),
      
        email: Yup.string()
            .email("يرجى إدخال بريد إلكتروني صالح")
            .required("يرجى إدخال البريد الإلكتروني"),
        subject: Yup.string().required("يرجى ادخال العنوان"),
        message: Yup.string().required("يرجى كتابة رسالتك"),
    });

    const handleSubmit = (values, { resetForm }) => {
        submitForm(values, {
            onSuccess: (data) => {
                // Show success toast
                toast.success(data.message || "تم إرسال رسالتك بنجاح");
                resetForm(); // Reset the form after successful submission
            },
            onError: (error) => {
                // Show error toast
                toast.error(error.message || "حدث خطأ أثناء إرسال الرسالة");
            },
        });
    };

    return (
        <div className="min-h-screen">
            <BreadCramp title="تواصل معنا" />
            <div className="m-auto flex justify-center align-middle">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    <h2 className="text-[38px] font-medium text-center text-[#121D2F] mb-6">أرسل لنا وسنتواصل معك</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className="space-y-6">
                                {/* Full Name Field */}
                                <div className="flex flex-col">
                                    <label className="text-[#6B7385] font-medium">الاسم كامل</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        className={`mt-1 p-3 border bg-[#F4F4F4] rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.name && touched.name ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder="الاسم كامل"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* subject Field */}
                                <div className="flex flex-col">
                                    <label className="text-[#6B7385] font-medium">العنوان</label>
                                    <Field
                                        type="text"
                                        name="subject"
                                        className={`mt-1 p-3 border bg-[#F4F4F4] rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.subject && touched.subject ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder="العنوان"
                                    />
                                    <ErrorMessage name="subject" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Email and Phone Number Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <label className="text-[#6B7385] font-medium">البريد الإلكتروني</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            className={`mt-1 p-3 border bg-[#F4F4F4] rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.email && touched.email ? "border-red-500" : "border-gray-300"
                                                }`}
                                            placeholder="البريد الإلكتروني"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-[#6B7385] font-medium">رقم الجوال</label>
                                        <Field
                                            type="text"
                                            name="phone"
                                            className={`mt-1 p-3 border bg-[#F4F4F4] rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.phone && touched.phone ? "border-red-500" : "border-gray-300"
                                                }`}
                                            placeholder="رقم الجوال"
                                        />
                                        <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div className="flex flex-col">
                                    <label className="text-[#6B7385] font-medium">اكتب رسالتك</label>
                                    <Field
                                        as="textarea"
                                        name="message"
                                        rows="4"
                                        className={`mt-1 p-3 border bg-[#F4F4F4] rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.message && touched.message ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder="اكتب رسالتك"
                                    />
                                    <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
                                    >
                                        <span>{isLoading ? "جاري الإرسال..." : "إرسال"}</span>
                                        <FaArrowLeft className="text-sm" />
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true} // Right-to-left for Arabic
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}