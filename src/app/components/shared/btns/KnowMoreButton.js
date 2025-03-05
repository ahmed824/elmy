"use client";

import { FaArrowLeft } from "react-icons/fa";

export default function KnowMoreButton({ onClick }) {
  return (
    <button
      onClick={onClick} // Use the onClick prop
      className="group font-regular flex items-center gap-2 border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full shadow-lg hover:bg-purple-50 hover:scale-105 transform transition-all duration-300 font-semibold"
    >
      <span className="flex items-center justify-center w-6 h-6 border-2 bg-white border-purple-600 rounded-full transition-colors group-hover:bg-purple-50">
        <FaArrowLeft className="text-sm text-purple-600" />
      </span>
      معرفة المزيد
    </button>
  );
}