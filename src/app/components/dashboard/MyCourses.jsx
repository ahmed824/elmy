"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import HomeCourse from "../shared/HomeCourse/HomeCourse";
import { useStudentCourses } from "@/app/customKooks/useStudentCoursesGet";

export default function MyCourses() {
  const { t } = useTranslation();
  const { data: courses, isLoading, isError, error } = useStudentCourses();
  const coursesCategories = [
    t("dashboard.myCoursesSection.all"),
    t("dashboard.myCoursesSection.unCompleted"),
    t("dashboard.myCoursesSection.completed"),
  ];
  const [active, setActive] = useState(t("dashboard.myCoursesSection.all"));

  function handleSelectCategory(category) {
    setActive(category);
  }

  const filteredCourses = courses?.filter((course) => {
    if (active === t("dashboard.myCoursesSection.all")) return true;
    if (active === t("dashboard.myCoursesSection.unCompleted"))
      return !course.completed;
    if (active === t("dashboard.myCoursesSection.completed"))
      return course.completed;
    return true;
  });

  const handleCourseClick = (courseId, name) => {
    router.push(`/courseDetails/${courseId}/${name.replace(/\s+/g, "-")}`);
  };
  return (
    <div className="mx-1 my-14 w-full">
      <ul className="flex flex-wrap justify-center gap-4 mx-auto ">
        {coursesCategories.map((item) => (
          <li key={item} onClick={() => handleSelectCategory(item)}>
            <button
              className={`py-2 px-3 rounded-full bg-gray-200 ${
                active === item ? "text-primary-purble" : ""
              }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10 w-full mx-auto md:mx-5">
        <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-1 mx-3 justify-center">
          {isLoading ? (
            // Loading state for Courses Grid
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white border-2 border-purple-300 rounded-xl shadow-lg overflow-hidden w-full max-w-sm animate-pulse"
              >
                <div className="relative h-52 bg-gray-200" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                </div>
              </div>
            ))
          ) : isError ? (
            // Error state for Courses Grid
            <div className="col-span-3 text-red-600">
              {t("filter.error") + `${error.message}`}
            </div>
          ) : (
            courses.map((course) => (
              <div key={course.id}>
                <HomeCourse handleCourseClick={handleCourseClick} {...course} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
