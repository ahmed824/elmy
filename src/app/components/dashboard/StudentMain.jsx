"use client";
import { useStudentStatus } from "@/app/customKooks/getStudentStatus";
import GreetingHeader from "./GreetingHeader";
import ProgressBox from "./ProgressBox";
import bookIcon from "@/images/dashboard/blue-book.svg";
import monitorIcon from "@/images/dashboard/feather_monitor.svg";
import awardIcon from "@/images/dashboard/purble-award.svg";
import DotsLoader from "../shared/DotsLoader";
import Error from "next/error";

export default function StudentMain() {
  const { data, isLoading, error } = useStudentStatus();
  const studentsStats = data || {
    enrolled_courses: 0,
    completed_courses: 0,
    in_progress_courses: 0,
  };
  const progressBoxes = [
    {
      icon: bookIcon,
      title: "dashboard.mainSection.registeredCourses",
      count: studentsStats.enrolled_courses,
      color: "custom-blue",
    },
    {
      icon: monitorIcon,
      title: "dashboard.mainSection.unCompletedCourses",
      color: "custom-purble",
      count: studentsStats.in_progress_courses,
    },
    {
      icon: awardIcon,
      title: "dashboard.mainSection.completedCourses",
      color: "primary-purble",
      count: studentsStats.completed_courses,
    },
  ];
  return (
    <section className="m-5 pb-28 md:pb-0">
      <GreetingHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center xl:grid-cols-3 gap-5 my-7">
        {progressBoxes.map((box) => {
          if (isLoading) {
            return <DotsLoader key={box.title}/>;
          } else if (error) {
            return (
              <div className="w-full bg-white py-10 text-center text-red-600" key={box.title}>
                حدث خطأ: {error.message}
              </div>
            );
          } else {
            return (
              <ProgressBox
                key={box.title}
                className={box.className}
                icon={box.icon}
                color={box.color}
                title={box.title}
                count={box.count}
              />
            );
          }
        })}
      </div>
    </section>
  );
}
