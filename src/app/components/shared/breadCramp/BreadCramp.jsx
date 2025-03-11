"use client"
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export default function BreadCramp({ title }) {
  const { t } = useTranslation();

  return (
    <div
      className="relative flex justify-center items-center min-h-[300px] -top-[132px] -z-10"
      style={{
        background: "linear-gradient(75deg, rgba(162, 57, 240, 0.4), #ffffff, rgba(248, 246, 207, 0.5))",
      }}
    >
      {/* Centered Content */}
      <div className="text-center mt-20">
       <h1 className="text-[30px] font-medium">{title}</h1>
        <p className="text-[#6B7385] font-medium flex items-center justify-center gap-1 mt-4">
          {t('breadCramp.home')} <FaChevronLeft className="text-[14px]" />{" "}
          <span className="text-[#6B7385] text-[14px] font-medium">{title}</span>
        </p>
      </div>
    </div>
  );
}