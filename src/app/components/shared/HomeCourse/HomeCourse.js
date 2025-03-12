"use client";
import Image from "next/image";
import { FaBook, FaMoneyBillWave, FaPlay } from "react-icons/fa";
import { RatingStars } from "../RatingStars";
import PurpleButton from "../btns/PurpleButton";
import AddToFav from "../addToFav/AddToFav";
import { useTranslation } from "react-i18next";

export default function HomeCourse({ course, handleCourseClick }) {
  const { t } = useTranslation();
  return (
    <div className="bg-white border-2 border-purple-300 rounded-xl shadow-lg overflow-hidden w-full max-w-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
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
          // Default image or text if no image is available
          <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
            {t("filter.noImage")}
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
              <span className="text-purple-600">
                {" "}
                {t("filter.videos")}:
                <span className="text-black"> {course.videos || 0}</span>
              </span>
            </span>
            <span className="flex items-center gap-2">
              <FaBook className="text-purple-600" />
              <span className="text-purple-600">
                {t("filter.lessons")}:
                <span className="text-black"> {course.lessons || 0}</span>{" "}
              </span>
            </span>
          </div>

          {/* Rating Stars */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <RatingStars rating={course.rating} />
            <span className="text-gray-600">
              ({course.enrollments} {t("filter.ratings")})
            </span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-purple-700 font-bold">
              <FaMoneyBillWave className="text-purple-600" />
              <span>
                {course.price}{" "}
                <span className="text-[#121D2F]">{t("filter.price")}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex justify-between items-center mt-6">
          <PurpleButton
            label={t("courses.learnMore")}
            onClick={() => handleCourseClick(course.id, course.name)}
          />
          <AddToFav courseId={course.id} />
        </div>
      </div>
    </div>
  );
}
