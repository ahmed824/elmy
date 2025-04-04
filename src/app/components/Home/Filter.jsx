import React, { useState } from "react";
import Image from "next/image";
import PurpleButton from "../shared/btns/PurpleButton";
import { FaPlay, FaBook, FaMoneyBillWave, FaStar } from 'react-icons/fa';
import { LuBookmark } from "react-icons/lu";
import { useCourses } from "@/app/customKooks/useCourses";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import HomeCourse from "../shared/HomeCourse/HomeCourse";


const filterButtons = [
  { id: 1, label: "filter.new", filter: "new" },
  { id: 2, label: "filter.popular", filter: "popular" },
  { id: 3, label: "filter.best", filter: "best" },
];

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-[#FF8F3C]" />
      ))}
      {hasHalfStar && <FaStar key="half" className="text-[#FF8F3C] opacity-50" />}
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
  const courses = data?.data.slice(0, 3) || [];

  const translate = (key, defaultValue = '') => {
    const translation = t(key, { defaultValue });
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
    }
    return translation || defaultValue;
  };

  const handleCourseClick = (courseId, name) => {
    router.push(`/courseDetails/${courseId}/${name.replace(/\s+/g, "-")}`);
  };

  return (
    <div className="text-center p-5 my-5">
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
              {translate(button.label, button.filter)}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center ma-w-7xl mx-auto px-4">
        {isLoading ? (
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
          <div className="col-span-3 text-red-600">{translate('filter.error', 'Error loading courses')}</div>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border-2 border-purple-300 rounded-xl shadow-lg overflow-hidden w-full max-w-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-52 group overflow-hidden">
                {course.image ? (
                  <Image
                    src={course.image}
                    alt={course.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
                    {translate('filter.noImage', 'No Image Available')}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-6 text-right">
                <h3 className="text-xl font-bold text-gray-800 line-clamp-2 hover:line-clamp-none mb-4">
                  {course.name}
                </h3>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-start gap-2 text-gray-600 text-right">
                    <span className="flex items-center gap-2">
                      <FaPlay className="text-purple-600" />
                      <span className="text-purple-600"> {translate('filter.videos', 'Videos')}:<span className="text-black"> {course.videos || 0}</span></span>
                    </span>
                    <span className="flex items-center gap-2">
                      <FaBook className="text-purple-600" />
                      <span className="text-purple-600">{translate('filter.lessons', 'Lessons')}:<span className="text-black"> {course.lessons || 0}</span> </span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-4">
                    <RatingStars rating={course.rating} />
                    <span className="text-gray-600">({course.enrollments} {translate('filter.ratings', 'Ratings')})</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-purple-700 font-bold">
                      <FaMoneyBillWave className="text-purple-600" />
                      <span>{course.price} <span className="text-[#121D2F]">{translate('filter.price', 'Price')}</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <PurpleButton label={translate('courses.learnMore', 'Learn More')} onClick={() => handleCourseClick(course.id, course.name)} />
                  <button className="p-2 group hover:bg-purple-100 border-2 border-mainColor rounded-full transition-colors duration-300">
                    <LuBookmark className="text-mainColor text-2xl group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
