"use client";
import Image from "next/image";
import openBookIcon from "@/images/dashboard/feather_book-open.svg";
import checkIcon from "@/images/dashboard/check-icon.svg";
import logoutIcon from "@/images/dashboard/right-arrow.svg";
import homeIcon from "@/images/dashboard/dashboard-home.svg";
import settingsIcon from "@/images/dashboard/settings-icon.svg";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function TrainerSideBar({
  setSecondDashboardSubTitle,
  isActive,
  handleActiveLink,
  setDashBoardTitle,
}) {
  const { t } = useTranslation();
  function handleClickLink(item) {
    if (item === "courses") {
      setSecondDashboardSubTitle(t(`dashboard.traniderPagesTitle.${item}`));
      setDashBoardTitle(t(`dashboard.traniderPagesTitle.${item}`));
    } else {
      setSecondDashboardSubTitle(t(`dashboard.sidebar.trainer.${item}`));
      setDashBoardTitle(t(`dashboard.sidebar.trainer.${item}`));
    }
  }
  return (
    <div>
      <ul className="text-gray-500 flex flex-col justify-start">
        {[
          { item: "dashboard", img: homeIcon },
          { item: "courses", img: openBookIcon },
          { item: "ordersProfits", img: checkIcon },
          { item: "profile", img: settingsIcon },
          { item: "logout", img: logoutIcon },
        ].map(({ item, img }) => (
          <li key={item} className="" onClick={() => handleClickLink(item)}>
            <Link
              href={`${item === "dashboard" ? "main" : item}`}
              className={`flex items-center gap-2 my-2 hover:text-primary-purble cursor-pointer ${
                isActive == item ? "text-primary-purble" : "text-gray-500"
              }`}
              onClick={() => handleActiveLink(item)}
            >
              <Image
                src={img}
                alt={`${item} icon`}
                className="size-4 text-gray-800"
              />
              {t(`dashboard.sidebar.trainer.${item}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
TrainerSideBar.propTypes = {
  setSecondDashboardSubTitle: PropTypes.func.isRequired,
  isActive: PropTypes.string.isRequired,
  handleActiveLink: PropTypes.func.isRequired,
  setDashBoardTitle: PropTypes.func.isRequired,
};
