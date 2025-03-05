"use client";
import React, { useState } from "react";
import { IoStar } from "react-icons/io5";
export default function ReviewForm() {
  const [rating, setRating] = useState(0);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      {/* Star Rating */}
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

      {/* Title */}
      <h2 className="text-right text-sm font-bold text-gray-700 mb-2">شاركنا رأيك</h2>

      {/* Text Area */}
      <textarea
        className="w-full h-28 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 text-right placeholder-gray-400"
        placeholder="اكتب رأيك في الدورة"
      ></textarea>

      {/* Submit Button */}
      <div className="flex justify-start mt-4">
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-2xl shadow-md hover:opacity-90 transition">
          إرسال
        </button>
      </div>
    </div>
  );
}
