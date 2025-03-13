"use client";

import { useState } from "react";
import CourseContent from "./CourseContent";
import Ratings from "./Ratings";
import Requirements from "./Requirements";
import ReviewForm from "./ReviewForm";
import TrainerCard from "./TrainerCard";

export default function CourseDetailsClient({ course }) {
    const [activeTab, setActiveTab] = useState("ملخص الدورة");

    const tabs = [
        { name: "ملخص الدورة", id: "summary" },
        { name: "محتوى الدورة", id: "content" },
        { name: "تفاصيل", id: "details" },
        { name: "المدرب", id: "trainer" },
        { name: "التقييمات", id: "ratings" },
    ];

    return (
        <div className="mt-4 pb-40">
            {/* Responsive Tabs Section */}
            <div className="w-full overflow-x-auto no-scrollbar">
                <div className="flex gap-2 md:gap-4 rounded-full bg-white shadow-md my-4 p-2 md:p-4 min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.name)}
                            className={`whitespace-nowrap py-2 px-4 md:px-10 my-1 md:my-3 rounded-full transition-all text-sm md:text-base ${activeTab === tab.name
                                ? "bg-purple-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Course Summary - Displays Everything */}
            {activeTab === "ملخص الدورة" && (
                <>
                    {/* Course Details Box */}
                    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                            ماذا ستتعلم في الدورة
                        </h2>
                        <p className="text-gray-600">
                            {course?.instructions}
                        </p>

                        <div className="mt-4">
                            <p className="text-gray-700 font-semibold">ستتمكن من:</p>
                            <p className="text-gray-600 mt-1">{course?.what_you_learn}</p>
                        </div>

                        <div className="mt-4">
                            <p className="text-gray-700 font-semibold">سير عملك.</p>
                            <p className="text-gray-600">
                                بثقة، أنشئ واحفظ دفاتر العمل، وافهم تنسيقات الملفات الأساسية لتبسيط
                            </p>
                        </div>
                    </div>

                    <div className="my-4">
                        <CourseContent data={course} />
                    </div>

                    <div className="my-4">
                        <Requirements course={course} />
                    </div>

                    <div className="my-4">
                        <TrainerCard data={course?.instructor} />
                    </div>

                    <div className="my-4">
                        <Ratings data={course.rating} />
                    </div>

                    <div className="my-4">
                        <ReviewForm courseId={course.id} />
                    </div>
                </>
            )}

            {/* Individual Sections Based on Selected Tab */}
            {activeTab === "محتوى الدورة" && <CourseContent data={course} />}
            {activeTab === "تفاصيل" && <Requirements course={course} />}
            {activeTab === "المدرب" && <TrainerCard data={course?.instructor} />}
            {activeTab === "التقييمات" && (
                <>
                    <Ratings data={course.rating} />
                    <div className="my-4">
                        <ReviewForm courseId={course.id} />
                    </div>
                </>
            )}
        </div>
    );
}