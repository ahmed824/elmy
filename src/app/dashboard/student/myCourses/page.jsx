'use client'
import DashBoardSideBar from "@/app/components/dashboard/DashBoardSideBar";
import MyCourses from "@/app/components/dashboard/MyCourses";
import BreadCramp from "@/app/components/shared/breadCramp/BreadCramp";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <>
      <BreadCramp title={t('dashboard.sidebar.myCourses')} />
      <section className="flex flex-row container min-h-screen mx-auto">
        <DashBoardSideBar />
        <MyCourses />
      </section>
    </>
  );
}
