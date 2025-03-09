"use client";
import DashBoardSideBar from "@/app/components/dashboard/DashBoardSideBar";
import Favorites from "@/app/components/dashboard/Favorites";
import BreadCramp from "@/app/components/shared/breadCramp/BreadCramp";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <>
      <BreadCramp title={t("dashboard.sidebar.favorites")} />
      <section className="flex flex-row container min-h-screen mx-auto">
        <DashBoardSideBar />
        <Favorites />
      </section>
    </>
  );
}
