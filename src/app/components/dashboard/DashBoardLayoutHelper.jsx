"use client";
import { useContext } from "react";
import DashBoardSideBar from "./DashBoardSideBar";
import { LayoutContext } from "@/app/providers/LayoutContext";

export default function DashBoardLayoutHelper({ children }) {
  const { dashBoardTitle, firstDashBoardSubTitle, secondDashboardSubTitle } =
    useContext(LayoutContext);
  return (
    <>
      <header className="flex flex-col justify-center items-center h-[100px] bg-gradient-to-t from-amber-100 to-amber-50">
        <h1 className="text-xl m-5">{dashBoardTitle}</h1>
        <p className="flex text-sm text-gray-500">
          <span className="text-gray-600 font-semibold mx-2">
            {" "}
            {` .  ${firstDashBoardSubTitle}`}{" "}
          </span>
          <span> {` .  ${secondDashboardSubTitle}`} </span>
        </p>
      </header>
      <section className="flex flex-row container min-h-screen mx-auto">
        <DashBoardSideBar />
        {children}
      </section>
    </>
  );
}
