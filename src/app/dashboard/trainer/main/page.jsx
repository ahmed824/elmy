'use client'
import DashBoardSideBar from "@/app/components/dashboard/DashBoardSideBar";
import TrainerMain from "@/app/components/dashboard/TrainerMain";
import BreadCramp from "@/app/components/shared/breadCramp/BreadCramp";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <>
      <BreadCramp title={t("dashboard.trainerPagesTitle.dashboard")} />
      <section className="flex flex-row container min-h-screen mx-auto">
        <DashBoardSideBar />
        <TrainerMain />
      </section>
    </>
  );
}