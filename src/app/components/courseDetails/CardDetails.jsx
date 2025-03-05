import React from 'react';
import { FaShoppingCart, FaPlay, FaUndoAlt, FaHourglassHalf } from 'react-icons/fa';
import Image from 'next/image';
import SocialShare from '../shared/SocialShare/SocialShare';
import Table from './Table';
import excel from "@/images/excel.svg";
import { FiBookmark } from 'react-icons/fi';
export default function CardDetails() {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 max-w-sm mx-auto border-2 border-mainColor relative transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            {/* Bookmark Icon */}
            <div className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-110 z-50">
                <FiBookmark className="text-purple-500 text-lg hover:text-purple-700" />
            </div>

            <div className="relative group">
                <Image
                    src={excel}
                    alt="Course Preview"
                    width={300}
                    height={180}
                    className="rounded-lg w-full transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col items-center justify-between py-4 opacity-100 transition-opacity duration-300">
                    {/* FaPlay Icon in the Middle */}
                    <div className="flex-grow flex items-center justify-center">
                        <div className="bg-white p-5 rounded-full shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-110 animate-pulse-slow">
                            <FaPlay className="text-purple-500 text-xl hover:text-purple-700" />
                        </div>
                    </div>

                    {/* Text at the Bottom */}
                    <p className="text-white text-center text-base font-medium transition-colors duration-200 hover:text-purple-300 cursor-pointer">
                        معاينة هذه الدورة
                    </p>
                </div>
            </div>


            {/* Price & CTA */}
            <p className="text-right text-xl font-semibold text-purple-600 mt-3 transform transition-transform duration-200 hover:scale-105">
                160 ريال
            </p>

            {/* Add to Cart Button */}
            <button
                className="bg-gradient-to-r from-[#A436F0] via-[#637FEA] to-[#A436F0] text-white px-4 md:px-6 py-2 rounded-full flex justify-center items-center mt-4 gap-2 w-full transform transition-transform duration-200 hover:scale-105 hover:shadow-lg animate-bounce"
            >
                الاضافة إلى السلة
                <FaShoppingCart className="text-sm text-white" />
            </button>

            {/* Subscribe Button */}
            <button className="border border-gray-300 text-gray-700 text-xl font-medium w-full py-2 rounded-full mt-2 flex items-center justify-center transform transition-transform duration-200 hover:scale-105 hover:bg-purple-500">
                إشترك الآن
            </button>

            {/* Money-Back Guarantee */}
            <p className="text-sm text-[#6B7385] text-[14px] font-medium flex items-center justify-center gap-1 mt-2 transform transition-transform duration-200 hover:scale-105">
                <FaUndoAlt className="text-gray-400" />
                ضمان استعادة الأموال لمدة 10 يومًا
            </p>

            {/* Course Details */}
            <div className="mt-4">
                <Table />
            </div>

            {/* Course Duration Info */}
            <p className="text-center text-[#FF8F3C] mt-3 flex items-center justify-center gap-1 transform transition-transform duration-200 hover:scale-105">
                <FaHourglassHalf className="text-[#FF8F3C] text-xl animate-sand-fall" />
                مدة مشاهدة الدورة 12 شهر
            </p>

            {/* Social Share */}
            <div className="mt-4">
                <SocialShare />
            </div>
        </div>
    );
}