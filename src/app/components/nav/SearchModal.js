"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useCourses } from "@/app/customKooks/getCourses";
import Image from "next/image";
import Link from "next/link";

export default function SearchModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [openAccordion, setOpenAccordion] = useState(null);

  // Filter parameters
  const filters = {
    lang: "en",
    category_id: "",
    level: "",
    per_page: 22,
    min_price: "",
    max_price: "",
    min_rating: "",
    search: searchQuery || "",
    sort_by: "",
  };

  // Always call the hook, but conditionally use its data
  const { data, isLoading } = useCourses(filters);

  // Only use the data if searchQuery is not empty after trimming
  const shouldFetchCourses = searchQuery.trim().length > 0;
  const courses = shouldFetchCourses ? data?.data?.data : [];

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
        >
          ×
        </button>

        {/* Search Input */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            {t("searchButton")}
          </button>
        </div>

        {/* Course Accordion List with Scroll */}
        <div className="max-h-80 overflow-y-auto pr-2">
          {!shouldFetchCourses ? (
            <p className="text-center py-4 text-gray-600">
              {t("startTypingToSearch")}
            </p>
          ) : isLoading ? (
            <p className="text-center py-4 text-gray-600">{t("loading")}</p>
          ) : courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="border border-gray-200 rounded-lg"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() =>
                      setOpenAccordion(
                        openAccordion === course.id ? null : course.id
                      )
                    }
                    className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-100 hover:bg-gray-200 rounded-t-lg transition-all"
                  >
                    <div className="flex items-center gap-3">
                      {/* Course Image with Link */}
                      <Link
                        href={`/courseDetails/${
                          course.id
                        }/${course.title.replace(/\s+/g, "-")}`}
                        className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden"
                      >
                        {course.image ? (
                          <Image
                            src={course.image}
                            alt={course.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-600 text-xs">
                            No Image
                          </div>
                        )}
                      </Link>

                      <div>
                        <h3 className="text-sm font-semibold">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-600">{course.level}</p>
                      </div>
                    </div>
                    <span className="text-gray-600">
                      {openAccordion === course.id ? "▲" : "▼"}
                    </span>
                  </button>

                  {/* Accordion Content */}
                  {openAccordion === course.id && (
                    <div className="p-4 space-y-2 border-t bg-white transition-all">
                      <p className="text-sm text-gray-700">
                        {course.description}
                      </p>
                      <p className="text-sm">
                        <strong>{t("Instructor")}:</strong>{" "}
                        {course.instructor?.name || "N/A"}
                      </p>
                      <p className="text-sm">
                        <strong>{t("Rating")}:</strong> ⭐ {course.rating} / 5
                      </p>
                      <p className="text-sm">
                        <strong>{t("Duration")}:</strong> {course.duration}
                      </p>
                      <p className="text-sm font-bold">
                        <strong>{t("Price")}:</strong>{" "}
                        {course.discount_price ? (
                          <>
                            <span className="text-red-500">
                              ${course.discount_price}
                            </span>
                            <span className="text-gray-500 line-through ml-2">
                              ${course.price}
                            </span>
                          </>
                        ) : (
                          `$${course.price}`
                        )}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-gray-600">{t("noResults")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
