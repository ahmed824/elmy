"use client";
import DashBoardSideBar from "@/app/components/dashboard/DashBoardSideBar";
import StudentMain from "@/app/components/dashboard/StudentMain";
import BreadCramp from "@/app/components/shared/breadCramp/BreadCramp";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <>
      <BreadCramp title={t("dashboard.title")} />
      <section className="flex flex-row container min-h-screen mx-auto">
        <DashBoardSideBar />
        <StudentMain />
      </section>
    </>
  );
}
