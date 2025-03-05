import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function Ratings() {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col ">
            {/* Title */}
            <h2 className="text-lg font-bold text-[#121D2F] text-right mb-2 border-b-2 pb-3 mr-2 border-[#F3F3F3]">التقييمات</h2>

            <div className="flex flex-row items-center  w-full">
                {/* Overall Rating (Right Section) */}
                <div className="bg-[#FFF5F0] px-4 py-10 rounded-lg text-center w-40 shrink-0 m-2">
                    <span className="text-3xl font-bold text-[#121D2F]">0</span>
                    <div className="flex justify-center text-gray-400 mt-1">
                        {Array.from({ length: 5 }, (_, i) => (
                            <FaRegStar key={i} />
                        ))}
                    </div>
                    <p className="text-sm text-[#FF8F3C] mt-1">تقييم الدورة</p>
                </div>
                {/* Ratings Section */}
                <div className="flex-1 flex flex-col space-y-3">

                    {/* Ratings List */}
                    {[5, 4, 3, 2, 1].map((stars, index) => (
                        <div key={index} className="flex items-center justify-center gap-3">
                            {/* Stars */}
                            <div className="flex text-orange-400">
                                {Array.from({ length: 5 }, (_, i) =>
                                    i < stars ? <FaStar key={i} /> : <FaRegStar key={i} className="text-gray-300" />
                                )}
                            </div>
                            {/* Progress Bar */}
                            <div className="w-[100%] h-2 bg-gray-200 rounded-md"></div>
                            {/* Percentage */}
                            <span className="text-gray-500 text-sm whitespace-nowrap">0%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
