import React from "react";
import Image from "next/image";
import howWork from "@/images/howWork.svg";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import BreadCramp from "../components/shared/breadCramp/BreadCramp";

export default function Page() {
    const steps = [
        {
            title: "إنشاء حساب",
            description: "هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر."
        },
        {
            title: "ابحث عن دورتك",
            description: "تصفح قائمة الدورات المتاحة وابحث عن الدورة التي تناسب اهتماماتك واحتياجاتك."
        },
        {
            title: "قائمة الدورات",
            description: "قم بمراجعة تفاصيل الدورة مثل المحتوى، الأهداف، والمتطلبات قبل الاشتراك بها."
        },
        {
            title: "اشترك في الدورة",
            description: "اضغط على زر الاشتراك وقم بإتمام عملية التسجيل للبدء في تعلم الدورة."
        },
        {
            title: "شاهد الدورة الخاصة بك",
            description: "ابدأ في مشاهدة دروس الدورة من خلال المنصة في أي وقت يناسبك."
        },
        {
            title: "استلم شهادتك",
            description: "عند إتمام الدورة بنجاح، يمكنك تحميل شهادتك وإضافتها إلى ملفك الشخصي."
        }
    ];

    return (
        <div >
            <BreadCramp title="كيف نعمل" />
            <div className="container mx-auto px-4 md:px-10 lg:px-20 py-10 flex flex-col md:flex-row items-center">
                {/* Right Side Content */}
                <div className="w-full md:w-1/2 mt-6 md:mt-0 text-right">
                    <span className="text-sm text-mainColor bg-purple-200 px-3 py-1 rounded-full transition-all duration-300 hover:bg-purple-300">
                        تعلم أينما كنت
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold mt-3 transition-all duration-300 hover:text-[#A436F0]">
                        كيف تشترك في الدورة
                    </h2>
                    <p className="text-gray-600 mt-2 transition-all duration-300 hover:text-gray-800">
                        الرجاء اتباع الخطوات التالية
                    </p>

                    {/* Steps List */}
                    <ul className="mt-6 space-y-6">
                        {steps.map((step, index) => (
                            <li 
                                key={index} 
                                className="text-lg text-gray-700 group transition-all duration-300 hover:scale-105"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="bg-[#A436F030] text-mainColor p-2 rounded-full transition-all duration-300 group-hover:bg-[#A436F050]">
                                        <FaCheck />
                                    </span>
                                    <span className="font-semibold transition-all duration-300 group-hover:text-[#A436F0]">
                                        {step.title}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-[15px] mt-1 pr-8 transition-all duration-300 group-hover:text-gray-700">
                                    {step.description}
                                </p>
                            </li>
                        ))}
                    </ul>

                    {/* Button */}
                    <div className="mt-8">
                        <button 
                            className="bg-gradient-to-r from-[#A436F0] via-[#637FEA] to-[#A436F0] text-white px-4 md:px-6 py-2 rounded-full flex items-center gap-2 mr-1 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <span>مشاهدة كل الدورات</span>
                            <FaArrowLeft className="text-sm text-white transition-all duration-300 group-hover:-translate-x-1" />
                        </button>
                    </div>
                </div>

                {/* Left Side Image */}
                <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
                    <div className="transition-all duration-300 hover:scale-105">
                        <Image 
                            src={howWork} 
                            alt="How it works" 
                            width={500} 
                            height={500} 
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}