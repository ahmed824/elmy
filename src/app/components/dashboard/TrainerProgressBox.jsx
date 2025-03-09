"use client";
import Image from "next/image";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function TrainerProgressBox({ icon, title, count }) {
  const { t } = useTranslation();
  return (
    <div
      className={`flex flex-col justify-center items-center py-8 px-12 w-64 rounded-2xl shadow-md`}
      dir="rtl"
    >
      <div
        className={`w-[78px] h-[78px] rounded-full flex justify-center items-center m-2 bg-gray-200`}
      >
        <Image src={icon} alt={icon} className="w-[30px] object-contain " />
      </div>
      <p className="font-bold text-3xl m-2">
        {(title === "dashboard.mainSection.trainer.totalProfits" ||
          title === "dashboard.trainerProfitsSection.totalProfits" ||
          title === "dashboard.trainerProfitsSection.pendingProfits" ||
          title === "dashboard.trainerProfitsSection.profitsCouldWithdraw") &&
          "$"}
        {count}
      </p>
      <p className="font-normal text-gray-500">{t(title)}</p>
    </div>
  );
}

TrainerProgressBox.propTypes = {
  icon: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
