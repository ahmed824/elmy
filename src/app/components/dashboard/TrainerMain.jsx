"use client";

import GreetingHeader from "./GreetingHeader";
import dolarIcon from "@/images/dashboard/dolar-icon.svg";
import orangeBookIcon from "@/images/dashboard/orange-open-book.svg";
import userIcon from "@/images/dashboard/purble-user.svg";
import arrowIcon from "@/images/dashboard/white-left-arrow.svg";
import TrainerProgressBox from "./TrainerProgressBox";
import { useContext } from "react";
import { LayoutContext } from "@/app/providers/LayoutContext";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";

const progressBoxes = [
  {
    icon: dolarIcon,
    title: "dashboard.mainSection.trainer.totalProfits",
    count: 25000,
  },
  {
    icon: orangeBookIcon,
    title: "dashboard.mainSection.trainer.activeCourses",
    count: 25,
  },
  {
    icon: userIcon,
    title: "dashboard.mainSection.trainer.studentsNumber",
    count: 500,
  },
];

const courses = Array(7).fill({
  name: "Introduction to Computer Science",
  duration: "12 أسبوع",
  students: "312 طالب",
  rating: "4.4/5",
});

export default function TrainerMain() {
  const { t } = useTranslation();
  const { setSecondDashboardTitle, setDashBoardTitle } =
    useContext(LayoutContext);
  return (
    <section className="m-5">
      <GreetingHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center xl:grid-cols-3 gap-5 my-7">
        {progressBoxes.map((box) => (
          <TrainerProgressBox
            key={box.title}
            icon={box.icon}
            title={box.title}
            count={box.count}
          />
        ))}
      </div>
      <div className="flex-1 pt-2 max-w-[80vw] md:w-auto m-auto" dir="rtl">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-full">
          <h2 className=" font-semibold text-lg p-4">قائمة دوراتي</h2>
          <div className="overflow-x-auto w-full">
            <table className=" w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-500 text-right">
                  <th className="p-3">اسم الكورس</th>
                  <th className="p-3">مدة الكورس</th>
                  <th className="p-3">عدد الطلاب</th>
                  <th className="p-3">التقييم</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index} className="border-b text-sm">
                    <td className="p-3">{course.name}</td>
                    <td className="p-3">{course.duration}</td>
                    <td className="p-3">{course.students}</td>
                    <td className="p-3">{course.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 flex justify-center">
            <Link
              href={"/dashboard/trainer/courses"}
              onClick={() => {
                setSecondDashboardTitle(
                  t("dashboard.tranierPagesTitle.courses")
                );
                setDashBoardTitle(t("dashboard.traniderPagesTitle.courses"));
              }}
              className="group flex items-center gap-2  text-white px-6 py-2 rounded-full btn hover:scale-[1.1] "
            >
              عرض جميع الدورات
              <Image
                src={arrowIcon}
                width={20}
                height={20}
                alt="arrow"
                className="object-contain group-hover:-translate-x-3 transition-all duration-200"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
