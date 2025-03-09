'use client'
import GreetingHeader from "./GreetingHeader";
import ProgressBox from "./ProgressBox";
import bookIcon from "@/images/dashboard/blue-book.svg";
import monitorIcon from "@/images/dashboard/feather_monitor.svg";
import awardIcon from "@/images/dashboard/purble-award.svg";
const progressBoxes = [
  {
    icon: bookIcon,
    title: "dashboard.mainSection.registeredCourses",
    count: 0,
    color: "custom-blue",
  },
  {
    icon: monitorIcon,
    title: "dashboard.mainSection.unCompletedCourses",
    color: "custom-purble",
    count: 0,
  },
  {
    icon: awardIcon,
    title: "dashboard.mainSection.completedCourses",
    color: "primary-purble",
    count: 0,
  },
];
export default function StudentMain() {
  return (
    <section className="m-5">
      <GreetingHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center xl:grid-cols-3 gap-5 my-7">
        {progressBoxes.map((box) => (
          <ProgressBox
            key={box.title}
            className={box.className}
            icon={box.icon}
            color={box.color}
            title={box.title}
          />
        ))}
      </div>
    </section>
  );
}
