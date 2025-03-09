"use client";
import Image from "next/image";
import userIcon from "@/images/dashboard/user-icon.svg";
import leftArrow from "@/images/dashboard/left-arrow-backup-2-svgrepo-com.svg"; // Add an arrow icon
import rightArrow from "@/images/dashboard/right-arrow-backup-2-svgrepo-com.svg"; // Add an arrow icon
import { useContext, useState } from "react";
import { LayoutContext } from "@/app/providers/LayoutContext";
import StudentSideBar from "./StudentSideBar";
import TrainerSideBar from "./TrainerSideBar";
import { useTranslation } from "react-i18next";

export default function DashBoardSideBar() {
  const { t } = useTranslation();
  const {
    secondDashboardSubTitle,
    setSecondDashboardSubTitle,
    setDashboardTitle
  } = useContext(LayoutContext);
  const [trainer, setTrainer] = useState(true);

  const [isActive, setIsActive] = useState(secondDashboardSubTitle);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleActiveLink = (link) => {
    setIsActive(link);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  function handleGotoCoursesFromMain(linkRef) {
    linkRef.current.click();
  }

  return (
    <>
      <div
        className={`fixed top-[calc(60%_+_20px)] right-[-10px] transform -translate-y-1/2 shadow-[0px_2px_10px_5px_#A436F0] p-2 rounded-l-full cursor-pointer md:hidden z-[49] ${
          isSidebarVisible ? "hidden" : "block"
        }`}
        onClick={toggleSidebar}
      >
        <Image src={leftArrow} alt="arrow icon" className="w-6 h-6" />
      </div>

      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`fixed top-[20px] md:top-20 right-0  bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarVisible ? "translate-x-0" : "translate-x-full"
        } md:flex flex-col items-${trainer ? "start" : "center"}  ${
          trainer
            ? `shadow-md`
            : `border-2 border-t-primary-purble border-l-primary-purble border-b-blue-700 border-r-blue-700`
        } rounded-md p-4 mt-14 w-[60%] sm:w-[50%] md:w-[25rem] lg:w-[15rem] md:sticky h-screen md:h-fit z-50`}
      >
        <div className="flex flex-col items-center p-4 w-full">
          <Image src={userIcon} alt="user icon" className="size-20 mb-2" />
          <p className="text-gray-500 text-sm">
            {`${t("dashboard.sidebar.greeting")}
            ${t("dashboard.sidebar.username")}`}
          </p>
        </div>

        {trainer ? (
          <TrainerSideBar
            isActive={isActive}
            handleActiveLink={handleActiveLink}
            setSecondDashboardSubTitle={setSecondDashboardSubTitle}
            setDashboardTitle={setDashboardTitle}
            handleGotoCoursesFromMain={handleGotoCoursesFromMain}
          />
        ) : (
          <StudentSideBar
            isActive={isActive}
            handleActiveLink={handleActiveLink}
            setSecondDashboardSubTitle={setSecondDashboardSubTitle}
            setDashboardTitle={setDashboardTitle}
          />
        )}

        <div
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-primary-purble text-white p-2 rounded-r-full cursor-pointer md:hidden"
          onClick={toggleSidebar}
        >
          <Image
            src={rightArrow}
            alt="arrow icon"
            className="w-6 h-6 transform rotate-180"
          />
        </div>
      </div>
    </>
  );
}
