"use client"; // Required for Next.js App Router

import { useTranslation } from "react-i18next";
import { SlGlobe } from "react-icons/sl";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  // Toggle between English and Arabic
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang; // Update <html> lang attribute
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr"; // Update direction
  };

  return (
    <button
      onClick={toggleLanguage}
       className="flex gap-1 hover:text-purple-600 transition-colors"
    >
      {i18n.language === "en" ? "AR" : "EN"}
      <SlGlobe className="text-lg" />
      </button>
  );
}
