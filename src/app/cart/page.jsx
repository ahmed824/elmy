import React from "react";
import BreadCramp from "../components/shared/breadCramp/BreadCramp";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import PurpleButton from "../components/shared/btns/PurpleButton";

export default function Page() {
    return (
        <div>
            <BreadCramp title="السلة" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                    <div className="flex items-center justify-between w-full max-w-3xl p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-purple-500 transform hover:-translate-y-1 transition-transform duration-300 flex-row-reverse">

                        {/* Trash Icon */}
                        <button className="text-red-500 hover:text-red-700 text-2xl transition-colors duration-300">
                            <FaTrashAlt />
                        </button>

                        {/* Course Details */}
                        <div className="flex-grow px-4 text-right">
                            <h2 className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors duration-300">
                                دورة برنامج مايكروسوفت إكسيل المستوى الأساسي للمبتدئين
                            </h2>
                            <div className="flex items-center text-sm text-gray-500 mt-2">
                                <span className="ml-2 text-purple-500">فيديوهات 33</span>
                                <span className="ml-2">|</span>
                                <span className="text-gray-500">14 دروس</span>
                            </div>
                            <p className="mt-2 text-purple-600 font-bold hover:text-purple-700 transition-colors duration-300">160 ريال</p>
                        </div>

                        {/* Course Image */}
                        <div className="w-24 h-16 relative overflow-hidden rounded-lg">
                            <Image
                                src="/image.png"
                                alt="Course"
                                width={96}
                                height={64}
                                className="rounded-lg object-cover transform hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Total Cost Card */}
                    <div className="max-w-sm w-full bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 transition-transform duration-300">
                        <h2 className="text-lg font-semibold text-gray-800 text-right hover:text-purple-600 transition-colors duration-300">
                            التكلفة الإجمالية
                        </h2>

                        <div className="mt-4 space-y-3">
                            <div className="flex justify-between items-center text-right">
                                <span className="text-gray-500">إجمالي سعر الدورات</span>
                                <span className="text-gray-800 font-bold">160 ريال</span>
                            </div>

                            <div className="relative flex items-center bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors duration-300">
                                <input
                                    type="text"
                                    placeholder="ادخل كود الخصم"
                                    className="bg-transparent flex-1 p-2 text-right text-gray-600 outline-none"
                                />
                                <button className="bg-gradient-to-r from-[#A436F0] via-[#637FEA] to-[#A436F0] text-white px-4 py-1 rounded-full hover:opacity-90 transition-opacity duration-300">
                                    إرسال
                                </button>
                            </div>

                            <div className="flex justify-between items-center text-right mt-2">
                                <span className="text-gray-800 font-semibold">الإجمالي</span>
                                <span className="text-gray-800 font-bold">160 ريال</span>
                            </div>
                        </div>

                        <button className="w-full mt-4 bg-gradient-to-r from-[#A436F0] via-[#637FEA] to-[#A436F0] text-white text-lg font-semibold py-2 rounded-full hover:opacity-90 transition-opacity duration-300">
                            تأكيد الشراء
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}