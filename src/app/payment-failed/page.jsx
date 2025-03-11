"use client";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import Link from "next/link";

export default function PaymentError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mb-[230px] bg-gray-100 text-center px-6">
      {/* Animated Error Icon */}
      <div
        className="bg-red-100 text-red-600 p-6 rounded-full shadow-lg"
        data-aos="zoom-in"
      >
        <FaTimesCircle className="text-6xl" />
      </div>

      {/* Heading & Message */}
      <h1 className="text-3xl font-bold text-gray-800 mt-6" data-aos="fade-up">
        Payment Error
      </h1>
      <p className="text-gray-600 mt-3" data-aos="fade-up" data-aos-delay="200">
        Oops! Something went wrong with your payment. Please try again or contact support.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex gap-4" data-aos="fade-up" data-aos-delay="400">
        <Link
          href="/checkout"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          Try Again
        </Link>
        <Link
          href="/support"
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
