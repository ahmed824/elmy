"use client";
import Image from "next/image";
import plusCircleIcon from "@/images/dashboard/feather_plus-circle.svg";
import editIcon from "@/images/dashboard/feather_pen-tool.svg";
import deleteIcon from "@/images/dashboard/feather_trash.svg";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const courses = Array(7).fill({
  name: "Introduction to Computer Science",
  duration: "12 أسبوع",
  students: "312 طالب",
  rating: "4.4/5",
  control: {
    editIcon: editIcon,
    deleteIcon: deleteIcon,
  },
});
export default function TrainerMyCourses() {
  const { t } = useTranslation();
  return (
    <div
      className="flex-1 p-2 md:p-4 pt-0 max-w-[90vw] md:w-auto m-auto"
      dir="rtl"
    >
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-full">
        <div className="p-4 flex justify-between">
          <h2 className=" font-semibold text-lg">قائمة دوراتي</h2>
          <Link
            href={"/dashboard/trainer/createCourse"}
            onClick={() => {
              //   setSecondDashboardTitle(t("dashboard.tranierPagesTitle.courses"));
              //   setDashBoardTitle(t("dashboard.traniderPagesTitle.courses"));
            }}
            className="group flex items-center gap-2  text-white px-6 py-2 rounded-full btn hover:scale-[1.1] "
          >
            <span className="hidden md:inline">
              {t("dashboard.trainerCoursesTable.addCourse")}
            </span>

            <Image
              src={plusCircleIcon}
              alt="arrow"
              className="object-contain group-hover:-translate-x-3 transition-all duration-200"
            />
          </Link>
        </div>
        <div className="overflow-x-auto w-full">
          <table className=" w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-500 text-right">
                <th className="p-3">
                  {t("dashboard.trainerCoursesTable.courseName")}
                </th>
                <th className="p-3">
                  {t("dashboard.trainerCoursesTable.courseDuration")}
                </th>
                <th className="p-3">
                  {t("dashboard.trainerCoursesTable.studentsNumber")}
                </th>
                <th className="p-3">
                  {t("dashboard.trainerCoursesTable.courseRating")}
                </th>
                <th className="p-3">
                  {t("dashboard.trainerCoursesTable.courseControl")}
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} className="border-b text-sm">
                  <td className="p-3">{course.name}</td>
                  <td className="p-3">{course.duration}</td>
                  <td className="p-3">{course.students}</td>
                  <td className="p-3">{course.rating}</td>
                  <td className="p-3">
                    <div className="flex justify-start gap-3">
                      <Link
                        href="/dashboard/trainer/courses/edit"
                        className="size-6 rounded-full bg-green-300 p-1"
                      >
                        <Image src={course.control.editIcon} alt="edit icon" />
                      </Link>
                      <Link
                        href="/dashboard/trainer/courses/delete"
                        className="size-6 rounded-full bg-red-300 p-1"
                      >
                        <Image
                          src={course.control.deleteIcon}
                          alt="delete icon"
                          className=" "
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
