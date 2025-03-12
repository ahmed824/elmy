"use client";
import useAddToFavorites from "@/app/customKooks/useAddToFavorites";
import React, { useState } from "react";
import { FiBookmark } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

export default function AddToFav({ courseId }) {
  const { mutate: addToFavorites, isLoading: isFavoriteLoading } =
    useAddToFavorites();
  const [isFavorited, setIsFavorited] = useState(false); // State to track if the course is favorited

  const handleAddToFavorites = () => {
    addToFavorites(courseId, {
      onSuccess: (data) => {
        toast.success("تمت إضافة الدورة إلى المفضلة بنجاح!");
        console.log("Course added to favorites successfully!", data);
        setIsFavorited(true); // Set favorited state to true
      },
      onError: (error) => {
        toast.error(
          "حدث خطأ أثناء إضافة الدورة إلى المفضلة. يرجى المحاولة مرة أخرى."
        );
        console.error("Error adding course to favorites:", error);
      },
    });
  };

  return (
    <div
      className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-110 z-50 "
      onClick={handleAddToFavorites}
    >
      {isFavorited ? (
        <FaBookmark
          className={`text-purple-500 text-lg hover:text-purple-700 ${
            isFavoriteLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      ) : (
        <FiBookmark
          className={`text-purple-500 text-lg hover:text-purple-700 ${
            isFavoriteLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      )}
    </div>
  );
}