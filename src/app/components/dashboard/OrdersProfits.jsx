"use client";
import Image from "next/image";
import { useContext } from "react";
import { LayoutContext } from "@/app/providers/LayoutContext";
import TrainerProgressBox from "./TrainerProgressBox";
import dolarIcon from "@/images/dashboard/dolar-icon.svg";
import upGreenArrow from "@/images/dashboard/up-green-arrow.svg";
import downRedArrow from "@/images/dashboard/down-red-arrow.svg";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const progressBoxes = [
  {
    icon: dolarIcon,
    title: "dashboard.trainerProfitsSection.totalProfits",
    count: 25000,
  },
  {
    icon: dolarIcon,
    title: "dashboard.trainerProfitsSection.pendingProfits",
    count: 25,
  },
  {
    icon: dolarIcon,
    title: "dashboard.trainerProfitsSection.profitsCouldWithdraw",
    count: 500,
  },
];

const profites = Array(7).fill({
  name: "Introduction to Computer Science",
  studentName: "احمد محمد محمود",
  price: "$500",
  date: "12/12/2022",
  paidStatus: "ناجحة",
});

export default function OrdersProfits() {
  const { t } = useTranslation();
  const { setSecondDashboardTitle, setDashBoardTitle } =
    useContext(LayoutContext);
  return (
    <section className="m-5">
      <div className="p-4 flex justify-between">
        <h2 className="font-semibold text-lg">
          {t(`dashboard.traniderPagesTitle.ordersProfits`)}
        </h2>
        <Link
          href={""}
          onClick={() => {
            // setSecondDashboardTitle(t("dashboard.tranierPagesTitle.courses"));
            // setDashBoardTitle(t("dashboard.traniderPagesTitle.courses"));
          }}
          className=" text-white px-16 py-2 rounded-full btn hover:scale-[1.1] "
        >
          {t("dashboard.trainerCoursesTable.getProfits")}
        </Link>
      </div>

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
          <div className="overflow-x-auto w-full">
            <table className=" w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-500 text-right">
                  <th className="p-3">
                    {t("dashboard.trainerProfitsSection.courseName")}
                  </th>
                  <th className="p-3">
                    {t("dashboard.trainerProfitsSection.studentName")}
                  </th>
                  <th className="p-3">
                    {t("dashboard.trainerProfitsSection.price")}
                  </th>
                  <th className="p-3">
                    {t("dashboard.trainerProfitsSection.paidStatus")}
                  </th>
                  <th className="p-3">
                    {t("dashboard.trainerProfitsSection.date")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {profites.map((course, index) => (
                  <tr key={index} className="border-b text-sm">
                    <td className="p-3 flex gap-3">
                      <Image
                        src={index < 3 ? upGreenArrow : downRedArrow}
                        alt="green up arrow"
                      />
                      {course.name}
                    </td>
                    <td className="p-3">{course.studentName}</td>
                    <td className="p-3">{course.price}</td>
                    <td className="p-3">{course.paidStatus}</td>
                    <td className="p-3">{course.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
