"use client";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

export default function CourseContent({ data }) {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">محتوى الدورة</h2>
            <p className="text-gray-500 text-sm mb-4">
                {data?.duration || 0} 
            </p>

            <div className="border-t border-gray-200">
                {data?.modules?.map((module, index) => (
                    <div key={module.id} className="border-b border-gray-200">
                        <button
                            onClick={() => toggleSection(index)}
                            className="w-full flex justify-between items-center py-3 px-4 text-right text-gray-900 font-semibold"
                        >
                            {module.title}
                            {openSection === index ? (
                                <FaMinus className="text-mainColor" />
                            ) : (
                                <FaPlus className="text-mainColor" />
                            )}
                        </button>

                        {openSection === index && module.lessons.length > 0 && (
                            <div className="bg-gray-50 p-4 text-gray-700">
                                {module.lessons.map((lesson) => (
                                    <div key={lesson.id} className="flex items-center justify-between py-2 gap-4">
                                        <span className="flex-1 text-right">{lesson.title}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-500 text-sm">{lesson.duration} دقيقة</span>
                                            {lesson.is_preview ? (
                                                <span className="flex items-center gap-1 text-mainColor bg-[#A436F030] rounded px-3 py-1">
                                                    <FaEye className="text-mainColor" />
                                                    معاينة
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
