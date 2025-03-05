"use client"
import React, { useState } from 'react';

export default function Table() {
  const [showMore, setShowMore] = useState(false);

  // Initial course details (same as in your original code)
  const courseDetails = [
    { label: 'مدة الدورة', value: '4 ساعات 58 دقيقة 18 ثانية' },
    { label: 'درس', value: '33' },
    { label: 'فيديوهات', value: '33' },
    { label: 'اللغة', value: 'عربي' },
    { label: 'الأسئلة', value: '0' },
  ];

  // Additional details to show when "أظهر المزيد" is clicked
  const additionalDetails = [
    { label: 'مستوى الدورة', value: 'مبتدئ' },
    { label: 'شهادة', value: 'متاحة' },
    { label: 'تاريخ البدء', value: '1 مارس 2025' },
    { label: 'مدة الوصول', value: 'مدى الحياة' },
  ];

  // Handle toggle for showing/hiding additional details
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className=" p-4 rounded-lg mt-4 min-w-[290px] ">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">تتضمن هذه الدورة:</h3>
      <div className="space-y-2 text-gray-600 text-sm">
        {/* Table-like structure */}
        {courseDetails.map((item, index) => (
          <div key={index} className="flex justify-between items-center border-b border-gray-200 py-2 last:border-b-0">
            <span className="font-semibold text-[#6B7385] text-[16px] ">{item.label}</span>
            <span className="font-semibold text-[#6B7385] bg-[#F6F6F6] p-2 rounded">{item.value}</span>
          </div>
        ))}

        {/* Additional details (hidden by default, shown on click) */}
        {showMore && (
          <>
            {additionalDetails.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-200 py-2 last:border-b-0">
                <span className="font-semibold text-[#6B7385] text-[16px]">{item.label}</span>
                <span className="font-semibold text-[#6B7385] bg-[#F6F6F6] p-2 rounded">{item.value}</span>
              </div>
            ))}
          </>
        )}

        {/* Show More/Less Button */}
        <p
          className="text-purple-500 cursor-pointer text-center mt-2"
          onClick={handleShowMore}
        >
          {showMore ? 'أظهر أقل' : 'أظهر المزيد'}
        </p>
      </div>
    </div>
  );
}