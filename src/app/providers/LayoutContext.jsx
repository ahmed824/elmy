"use client";
import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Courses from "@/utils/courses";

// Create the context
export const LayoutContext = createContext({
  sidebarOpen: false,
  setSidebarOpen: () => {},
  toggleSidebar: () => {},
  setCourses: () => {},
  courses: [],
  acivePageHeader: "",
  setActivePageHeader: () => {},
  secondDashboardSubTitle: "",
  setSecondDashboardSubTitle: () => {},
  dashboardTitle: "",
  setDashboardTitle: () => {},
  setFirstDashBoardSubTitle: () => {},
  firstDashBoardSubTitle: "",
});

// Create the provider component
export const LayoutProvider = ({ children }) => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState(Courses);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [acivePageHeader, setActivePageHeader] = useState(t("dashboard.main"));
  const [secondDashboardSubTitle, setSecondDashboardSubTitle] = useState(
    `${t("dashboard.title")}`
  );
  const [dashBoardTitle, setDashBoardTitle] = useState(
    `${t("dashboard.main")}`
  );
  const [firstDashBoardSubTitle, setFirstDashBoardSubTitle] = useState(
    `${t("dashboard.main")}`
  );

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <LayoutContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        setCourses,
        courses,
        acivePageHeader,
        setActivePageHeader,
        secondDashboardSubTitle,
        setSecondDashboardSubTitle,
        dashBoardTitle,
        setDashBoardTitle,
        firstDashBoardSubTitle,
        setFirstDashBoardSubTitle,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
