"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // Added FaStar for rating
import { useCourses } from "@/app/customKooks/useCourses";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import HomeCourse from "../shared/HomeCourse/HomeCourse";


const filterButtons = [
  { id: 1, label: "filter.new", filter: "new" },
  { id: 2, label: "filter.popular", filter: "popular" },
  { id: 3, label: "filter.best", filter: "best" },
];

// Rating Stars Component
const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-[#FF8F3C]" />
      ))}
      {/* Half Star */}
      {hasHalfStar && (
        <FaStar key="half" className="text-[#FF8F3C] opacity-50" />
      )}
      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <FaStar key={`empty-${i}`} className="text-gray-300" />
      ))}
    </div>
  );
};

export default function Filter() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("new");
  const { data, isLoading, isError } = useCourses({
    lang: "ar",
    filter: activeFilter,
  });
  const router = useRouter();
  // Display only the first 3 courses
  const courses = data?.data.slice(0, 3) || [];

  const handleCourseClick = (courseId, name) => {
    router.push(`/courseDetails/${courseId}/${name.replace(/\s+/g, "-")}`);
  };

  return (
    <div className="text-center p-5 my-5">
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
        {filterButtons.map((button) => (
          <button
            key={button.id}
            onClick={() => setActiveFilter(button.filter)}
            className={`relative font-regular w-36 sm:w-24 md:w-36 py-1 sm:py-2 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 overflow-hidden
              ${
                activeFilter === button.filter
                  ? "bg-gradient-to-r from-[#601596] via-[#A436F0] to-[#601596] text-white"
                  : "border-2 border-[#601596] text-[#601596]"
              }`}
          >
            <span className="relative z-10 text-sm sm:text-base whitespace-nowrap">
              {t(button.label)}
            </span>
            {activeFilter === button.filter && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#601596] via-[#A436F0] via-white/20 via-[#A436F0] to-[#601596] opacity-80 hover:opacity-90 transition-opacity" />
            )}
            {activeFilter !== button.filter && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#601596] via-[#A436F0] to-[#601596] opacity-0 transition-opacity" />
            )}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center ma-w-7xl mx-auto px-4">
        {isLoading ? (
          // Loading state for Courses Grid
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white border-2 border-purple-300 rounded-xl shadow-lg overflow-hidden w-full max-w-sm animate-pulse"
            >
              <div className="relative h-52 bg-gray-200" />
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
              </div>
            </div>
          ))
        ) : isError ? (
          // Error state for Courses Grid
          <div className="col-span-3 text-red-600">{t("filter.error")}</div>
        ) : (
          // Display courses
          courses.map((course) => <HomeCourse handleCourseClick={handleCourseClick} key={course.id} course={course} />)
        )}
      </div>
    </div>
  );
}
