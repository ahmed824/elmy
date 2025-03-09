"use client";
import React, { useState } from "react";
import { IoStar } from "react-icons/io5";
import { useReviews } from "@/app/customKooks/getReviews";  
import { useAddReview } from "@/app/customKooks/addReview"; // Adjust path
import Image from "next/image";
import { toast } from "react-toastify";
import Avatar from "@/images/profile.svg";

export default function ReviewForm({ courseId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data, isLoading, isError } = useReviews(courseId, "ar");
  const reviews = data?.data || [];

  const { mutate: addReview, isLoading: isSubmitting } = useAddReview(courseId);

  const handleSubmit = () => {
    if (!rating || !comment) {
      toast.error("Please select a rating and write a comment");
      return;
    }

    addReview(
      { rating, comment, lang: "en" },
      {
        onSuccess: (data) => {
          toast.success(data.message || "Review added successfully");
          setRating(0);
          setComment("");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to add review");
        },
      }
    );
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <h2 className="text-right text-xl font-semibold text-[#121D2F] mb-4">
          آراء المتعلمين
        </h2>
        {isLoading ? (
          <div className="text-center text-gray-500">جاري تحميل الآراء...</div>
        ) : isError ? (
          <div className="text-center text-red-500">حدث خطأ أثناء جلب الآراء</div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-gray-500">لا توجد آراء بعد</div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex items-start gap-4 border-b border-gray-200 pb-4 last:border-b-0"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={review.user.avatar || Avatar}
                    alt={review.user.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-right text-sm font-medium text-[#121D2F]">
                      {review.user.name}
                    </h3>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <IoStar
                          key={i}
                          className={
                            i < review.rating ? "text-[#FF8F3C]" : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-right text-sm text-gray-600 mt-1">
                    {review.comment}
                  </p>
                  <p className="text-right text-xs text-gray-400 mt-2">
                    {new Date(review.created_at).toLocaleString("ar-EG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full my-4">
        <div className="flex justify-center mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <button
              key={i}
              onClick={() => setRating(i + 1)}
              className="text-2xl transition focus:outline-none"
            >
              <IoStar className={i < rating ? "text-[#FF8F3C]" : "text-gray-400"} />
            </button>
          ))}
        </div>
        <h2 className="text-right text-sm font-bold text-gray-700 mb-2">
          شاركنا رأيك
        </h2>
        <textarea
          className="w-full h-28 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 text-right placeholder-gray-400"
          placeholder="اكتب رأيك في الدورة"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex justify-start mt-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-2xl shadow-md hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال"}
          </button>
        </div>
      </div>
    </>
  );
}