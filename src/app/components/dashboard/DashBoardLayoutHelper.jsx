"use client";
import { useContext } from "react";
import DashBoardSideBar from "./DashBoardSideBar";
import { LayoutContext } from "@/app/providers/LayoutContext";
import BreadCramp from "../shared/breadCramp/BreadCramp";

export default function DashBoardLayoutHelper({ children }) {
  const { dashBoardTitle, firstDashBoardSubTitle, secondDashboardSubTitle } =
    useContext(LayoutContext);
  return (
    <>
      <BreadCramp title={dashBoardTitle} />
      <section className="flex flex-row container min-h-screen mx-auto">
        <DashBoardSideBar />
        {children}
      </section>
    </>
  );
}
