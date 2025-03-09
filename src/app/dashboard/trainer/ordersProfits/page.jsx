'use client'
import DashBoardSideBar from "@/app/components/dashboard/DashBoardSideBar";
import OrdersProfits from "@/app/components/dashboard/OrdersProfits";
import BreadCramp from "@/app/components/shared/breadCramp/BreadCramp";
import { useTranslation } from "react-i18next";

export default function page() {
  const { t } = useTranslation();
  return (
    <>
      <BreadCramp title={t("dashboard.trainerPagesTitle.ordersProfits")} />
      <section className="flex flex-row container min-h-screen mx-auto">
        <DashBoardSideBar />
        <OrdersProfits />
      </section>
      ;
    </>
  );
}
