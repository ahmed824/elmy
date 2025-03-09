import React from "react";
import DotsLoader from "../shared/DotsLoader";

export default function Requirements({ course }) {
  // Fallback in case course data is not provided
  if (!course) {
    return<DotsLoader />;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Title */}
      <h2 className="text-xl font-bold text-[#121D2F] mb-4">تفاصيل</h2>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {course.description}{" "}
        <strong>{course.title}</strong> هي دورة مصممة لتزويدك بالمهارات الأساسية التي تحتاجها للبدء.
      </p>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Requirements Section */}
      <h3 className="text-lg font-bold text-[#121D2F] mb-3">متطلبات</h3>
      <ul className="text-gray-600 space-y-2">
        <li>
          <strong>القسم 1:</strong> {course.modules[0]?.title || "غير متوفر"}
        </li>
        <li>
          <strong>المدة:</strong> {course.duration}
        </li>
        <li>
          <strong>المستوى:</strong> {course.level}
        </li>
        <li>
          <strong>المتطلبات الأساسية:</strong> {course.requirements}
        </li>

        {/* Modules and Lessons */}
        {course.modules && course.modules.length > 0 && (
          <div>
            <h4 className="text-md font-semibold text-[#121D2F] mb-2">
              {course.modules[0].title}
            </h4>
            <ul className="text-gray-600 space-y-2 list-disc pr-5">
              {course.modules[0].lessons.map((lesson) => (
                <li key={lesson.id}>{lesson.title}</li>
              ))}
            </ul>
          </div>
        )}
      </ul>
    </div>
  );
}
