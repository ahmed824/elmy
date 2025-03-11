    "use client";
import DashBoardSideBar from "@/app/components/dashboard/DashBoardSideBar";
import Profile from "@/app/components/dashboard/Profile";
import BreadCramp from "@/app/components/shared/breadCramp/BreadCramp";
import { useTranslation } from "react-i18next";

export default function page() {

  const { t } = useTranslation();
  return (
    <>
      <BreadCramp title={t("dashboard.title")} />
      <section className="flex flex-row container min-h-screen mx-auto">
        <DashBoardSideBar />
        <Profile />
      </section>
    </>
  );
}

