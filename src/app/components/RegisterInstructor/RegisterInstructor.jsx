"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRegisterInstructor } from "@/app/customKooks/authInstructor";
import StepWizard from "react-step-wizard";
import Image from "next/image";
import { useLogo } from "@/app/customKooks/logo";  
import logo from "@/images/logo.svg";
import loginImage from "@/images/login-visual.svg";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Step1 from "./steps/step1";  
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/step4"; 

const RegisterInstructor = () => {
    const { data: logoData } = useLogo();
    const { mutate, isPending } = useRegisterInstructor();
    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();

    const initialValues = {
        name: "",
        email: "",
        phone_country_code: "",
        phone_number: "",
        password: "",
        password_confirmation: "",
        cv: null,
        certificate: null,
        bio: "",
        specialization: "",
        university: "",
        department: "",
        nationality: "",
        gender: "",
        address: "",
        agree_terms: false,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("الاسم مطلوب"),
        email: Yup.string().email("بريد إلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
        phone_number: Yup.string().required("رقم الجوال مطلوب"),
        password: Yup.string()
            .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
            .required("كلمة المرور مطلوبة"),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref("password"), null], "كلمات المرور يجب أن تتطابق")
            .required("تأكيد كلمة المرور مطلوب"),
        cv: Yup.mixed().required("السيرة الذاتية مطلوبة"),
        certificate: Yup.mixed().required("الشهادة مطلوبة"),
        bio: Yup.string().required("النبذة مطلوبة"),
        specialization: Yup.string().required("التخصص مطلوب"),
        agree_terms: Yup.boolean().oneOf([true], "يجب الموافقة على الشروط"),
    });

    const handleSubmit = (values) => {
        const formData = new FormData();
        for (const key in values) {
            if (key === "cv" || key === "certificate") {
                if (values[key]) {
                    formData.append(key, values[key]);
                }
            } else {
                formData.append(key, values[key]);
            }
        }

        mutate(formData, {
            onSuccess: (data) => {
                Cookies.set("elmy_token", data.data.token, { expires: 7 });
                toast.success("تم تسجيل المدرب بنجاح!", {
                    position: "top-right",
                    autoClose: 3000,
                });
                setTimeout(() => router.push("/"), 1000);
            },
            onError: (error) => {
                toast.error(error.message || "فشل التسجيل", {
                    position: "top-right",
                    autoClose: 3000,
                });
            },
        });
    };

    const stepNames = [
        { number: 1, name: "المعلومات الشخصية" },
        { number: 2, name: "كلمة المرور" },
        { number: 3, name: "المستندات" },
        { number: 4, name: "التفاصيل النهائية" },
    ];

    return (
        <div className="min-h-screen pb-40 sm:pb-16 md:pb-32 flex items-center justify-center overflow-hidden">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col lg:flex-row">
                        <ToastContainer />
                        {/* Sidebar */}
                        <div className="w-full lg:w-1/4 flex flex-col justify-between bg-gray-100 p-4 sm:p-5 lg:p-6">
                            <div className="flex   sm:flex-row justify-center lg:items-start gap-2 sm:gap-4 -mr-2">
                                <Image src={logo} alt="Secondary Logo" width={80} height={40} className="w-16 sm:w-20 lg:w-24" />
                                {logoData?.data?.logo && (
                                    <Image
                                        src={logoData.data.logo || logo}
                                        alt="Logo"
                                        width={80}
                                        height={40}
                                        className="w-16 sm:w-20 lg:w-24"
                                    />
                                )}
                            </div>
                            <div className="mt-6 sm:mt-8 lg:mt-10 space-y-3 sm:space-y-4">
                                {stepNames.map((step) => (
                                    <div
                                        key={step.number}
                                        className={`flex items-center space-x-2 sm:space-x-3 whitespace-nowrap ${currentStep === step.number ? "text-purple-600 font-bold" : "text-gray-500"
                                            }`}
                                    >
                                        <div
                                            className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border ${currentStep === step.number
                                                    ? "border-[#ECE0F4] bg-[#ECE0F4] text-mainColor"
                                                    : "bg-[#EBEBEB] text-[#3F4254]"
                                                }`}
                                        >
                                            {step.number}
                                        </div>
                                        <div className="text-sm sm:text-base">{step.name}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 sm:mt-8 lg:mt-auto">
                                <Image
                                    src={loginImage}
                                    alt="Illustration"
                                    width={200}
                                    height={150}
                                    className="w-full hidden lg:block h-auto max-w-[200px] sm:max-w-[250px] lg:max-w-[300px] mx-auto"
                                />
                            </div>
                        </div>
                        {/* Form Content */}
                        <div className="w-full lg:w-3/4 p-4 sm:p-6 lg:p-8">
                            <StepWizard onStepChange={({ activeStep }) => setCurrentStep(activeStep)}>
                                <Step1 />
                                <Step2 />
                                <Step3 />
                                <Step4 isPending={isPending} />
                            </StepWizard>
                            <div className="text-center text-gray-500 mt-4 sm:mt-6 text-sm sm:text-base">
                                هل لديك حساب بالفعل؟{" "}
                                <Link href="/login" className="text-purple-600 hover:underline">
                                    سجل الدخول
                                </Link>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterInstructor;