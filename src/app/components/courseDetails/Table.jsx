"use client";
import React, { useState } from 'react';

export default function Table({ course }) {
  const [showMore, setShowMore] = useState(false);

  // Map course data to an array of details
  const courseDetails = [
    { label: 'مدة الدورة', value: course?.duration || 'غير محدد' },
    { label: 'عدد الدروس', value: course?.modules?.reduce((acc, module) => acc + (module.lessons?.length || 0), 0) || 0 },
    { label: 'الفيديوهات', value: course?.modules?.reduce((acc, module) => acc + (module.lessons?.filter(lesson => lesson.video_url)?.length || 0), 0) || 0 },
    { label: 'اللغة', value: 'عربي' }, 
    { label: 'الأسئلة', value: '0' },
    { label: 'مستوى الدورة', value: course?.level || 'غير محدد' },
    { label: 'مدة الوصول', value: 'مدى الحياة' }, 
  ];

  const initialDetails = courseDetails.slice(0, 5);
  const additionalDetails = courseDetails.slice(5);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const hasMoreThanFive = courseDetails.length > 5;

  return (
    <div className="p-4 rounded-lg mt-4 min-w-[290px]">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">تتضمن هذه الدورة:</h3>
      <div className="space-y-2 text-gray-600 text-sm">
        {/* Initial Details (always shown) */}
        {initialDetails.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-200 py-2 last:border-b-0"
          >
            <span className="font-semibold text-[#6B7385] text-[16px]">{item.label}</span>
            <span className="font-semibold text-[#6B7385] bg-[#F6F6F6] p-2 rounded">{item.value}</span>
          </div>
        ))}

        {/* Additional Details (shown when "Show More" is clicked) */}
        {showMore && additionalDetails.length > 0 && (
          <>
            {additionalDetails.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-200 py-2 last:border-b-0"
              >
                <span className="font-semibold text-[#6B7385] text-[16px]">{item.label}</span>
                <span className="font-semibold text-[#6B7385] bg-[#F6F6F6] p-2 rounded">{item.value}</span>
              </div>
            ))}
          </>
        )}

        {/* Show More/Less Button (only if more than 5 items) */}
        {hasMoreThanFive && (
          <p
            className="text-purple-500 cursor-pointer text-center mt-2"
            onClick={handleShowMore}
          >
            {showMore ? 'أظهر أقل' : 'أظهر المزيد'}
          </p>
        )}
      </div>
    </div>
  );
}