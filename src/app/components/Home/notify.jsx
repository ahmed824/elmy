"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function Notify() {
  const { t, i18n } = useTranslation();
  // Initialize isVisible based on localStorage value
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("notifyClosed") !== "true";
    }
    return true; // Default to visible if not in browser (SSR fallback)
  });
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Sync with localStorage on mount and refresh
  useEffect(() => {
    const isClosed = localStorage.getItem("notifyClosed") === "true";
    setIsVisible(!isClosed); // Set visibility based on localStorage
    setIsFadingOut(false); // Reset fade-out state on refresh
  }, []); // Empty dependency array ensures this runs only on mount

  // Handle close button click (sets notifyClosed to true)
  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      // Save the closed state to localStorage
      localStorage.setItem("notifyClosed", "true");
    }, 300); // Match the duration of the fade-out transition
  };

  // Optional: Function to reset notification (removes notifyClosed from localStorage)
  const handleReset = () => {
    setIsFadingOut(false);
    setIsVisible(true);
    localStorage.removeItem("notifyClosed"); // Remove the closed state
  };

  // Don't render anything if the notification is not visible and not fading out
  if (!isVisible && !isFadingOut) return null;

  return (
    <div
      className={`bg-gradient-to-r from-[#A239F0] via-[#B15EF5] to-[#C384FA] rounded-[50px] shadow-md w-[90%] md:w-[80%] top-2 left-[5%] md:left-36 fixed transition-all duration-300 z-50 ${
        isFadingOut ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-center text-white p-2 md:p-1">
        <p className="text-[12px] md:text-[14px] font-[500] text-white text-center md:text-right ml-3">
          {t("notify.bigGoals")}
          <span className="wave-hand md:text-2xl">👋</span>
        </p>
        <Link
          href="/subscribe"
          className="text-white px-2 py-1 md:px-3 md:py-2 rounded-lg hover:scale-110 transition-all flex items-center gap-1 md:gap-2 text-[12px] md:text-[14px] font-[500]"
        >
          {t("notify.subscribeNow")}
          {i18n.language === "ar" ? <FaArrowLeft /> : <FaArrowRight />}
        </Link>

        <button
          onClick={handleClose}
          className="absolute top-5 sm:top-3 left-2 text-white hover:text-gray-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 md:h-5 md:w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Optional: Uncomment this button to test resetting within the component */}
        {/* <button
          onClick={handleReset}
          className="absolute top-5 sm:top-3 right-2 text-white hover:text-gray-200 transition-colors"
        >
          Show Again
        </button> */}
      </div>
    </div>
  );
}