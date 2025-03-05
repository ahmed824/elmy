"use client";
import React from "react";

export default function HeaderSliderSkeleton() {
  return (
    <div className="w-full bg-white py-10 relative overflow-hidden min-h-screen flex items-center justify-center" dir="ltr">
      {/* Colors */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#A239F066] blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-1/4 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#F8F6CF]/50 blur-3xl pointer-events-none" />

      <div className="w-full relative z-10 mt-32">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4 sm:px-6 lg:px-8">
          {/* Image Skeleton */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-[500px] h-[500px] bg-gray-100 rounded-full animate-pulse" /> {/* Increased rounded corners */}
          </div>

          {/* Content Skeleton */}
          <div className="w-full md:w-1/2 text-right flex flex-col justify-start" dir="rtl">
            <div className="h-6 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
            <div className="mt-4 h-4 w-full bg-gray-200 rounded-lg animate-pulse" />
            <div className="mt-2 h-4 w-2/3 bg-gray-200 rounded-lg animate-pulse" />
            <div className="mt-6 flex gap-4 justify-start">
              <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}