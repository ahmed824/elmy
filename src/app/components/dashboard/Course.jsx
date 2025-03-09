"use client";
import PropTypes from "prop-types";
import Image from "next/image";
import bookIcon from "@/images/dashboard/feather_book.svg";
import playIcon from "@/images/dashboard/feather_play.svg";
import bookMarkIcon from "@/images/dashboard/feather_bookmark.svg";
import whiteBookMarkIcon from "@/images/dashboard/white-bookmark.svg";
import starIcon from "@/images/dashboard/star.png";
import { useContext } from "react";
import { LayoutContext } from "@/app/providers/LayoutContext";
import Link from "next/link";

export default function Course({
  name,
  image,
  price,
  lessons = 0,
  videos = 0,
  id,
  rating,
  enrollments,
  isBookmarked,
}) {
  const { setCourses } = useContext(LayoutContext);
  const handleBookmark = () => {
    setCourses((prev) => {
      const updatedCourses = prev.map((course) => {
        if (course.id === id) {
          return {
            ...course,
            isBookmarked: !course.isBookmarked,
          };
        }
        return course;
      });
      return updatedCourses;
    });
  };

  return (
    <div className="my-2 mx-auto rounded-2xl border-2 border-primary-purble flex flex-col w-[16rem]">
      <Image
        src={image}
        alt={name}
        className="w-full"
        width={256}
        height={144}
      />
      <h2 className="py-4 px-3 font-bold text-right">{name}</h2>
      <div className="flex justify-between items-center w-full my-2">
        <p className="flex items-center w-1/2 px-3 text-primary-purble">
          <Image src={playIcon} alt="play icon" width={16} height={16} />
          <span className="flex items-center justify-center">:فيديوهات</span>
          <span className="text-black mx-1">{videos}</span>
        </p>
        <p className="flex items-center w-1/2 px-3 text-primary-purble">
          <Image src={bookIcon} alt="book icon" width={16} height={16} />
          <span>: دروس</span>
          <span className="text-black mx-1">{lessons}</span>
        </p>
      </div>

      <div className="flex justify-between items-center mx-2">
        {/*this is for rating stars and rating number  */}
        <div className="flex items-center justify-start">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              src={starIcon}
              alt="star"
              className="w-4 h-4"
              width={16}
              height={16}
            />
          ))}
        </div>
        <div className="flex text-gray-400 text-sm">
          <p>{`( ${rating} تقييمات )`}</p>
        </div>
      </div>

      <div className="mt-auto">
        <p className="flex items-center py-3 px-4">
          ريال
          <span className="px-2 text-primary-purble font-semibold text-lg">
            {price}
          </span>
        </p>
        <p className="flex items-center justify-between py-3 px-4">
          <Link
            href={""}
            className="py-2 px-3 bg-gradient-to-l from-dark-purble via-primary-purble to-dark-purble text-white rounded-full"
          >
            معرفة المزيد
          </Link>
          <Image
            src={isBookmarked ? whiteBookMarkIcon : bookMarkIcon}
            alt="bookmark icon"
            className={`p-2 border rounded-full border-dark-purble cursor-pointer ${
              isBookmarked ? "bg-primary-purble" : ""
            }`}
            width={24}
            height={24}
            onClick={handleBookmark}
          />
        </p>
      </div>
    </div>
  );
}

Course.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  lessons: PropTypes.number.isRequired,
  videos: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  enrollments: PropTypes.number.isRequired,
};
