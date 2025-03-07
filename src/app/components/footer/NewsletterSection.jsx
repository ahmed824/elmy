"use client";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSubscribe } from "@/app/customKooks/useSubscribe";
import { toast } from "react-toastify"; // Keep this for triggering toasts
import { useTranslation } from "react-i18next";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { mutate, isLoading } = useSubscribe();
  const { t } = useTranslation();

  const handleSubscribe = () => {
    if (!email) {
      toast.error(t("footer.newsLetterSection.emptyEmail"));
      return;
    }
    mutate(email, {
      onSuccess: () => {
        toast.success(t("footer.newsLetterSection.success"));
        setEmail(""); // Clear input on success
      },
      onError: () => {
        toast.error(t("footer.newsLetterSection.error"));
      },
    });
  };

  return (
    <div className="absolute bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between w-[90%] max-w-6xl mx-auto top-[-145px] sm:-top-[108px] left-1/2 transform -translate-x-1/2">
      {/* Text Section */}
      <div className="md:w-1/2   mb-6 md:mb-0">
        <h2 className="text-lg md:text-3xl font-semibold">
          {t("footer.newsLetterSection.title")}
        </h2>
        <p className="mt-2 text-sm md:text-base">
          {t("footer.newsLetterSection.description")}
        </p>
      </div>

      {/* Email Input Section */}
      <div className="md:w-1/2 flex justify-center md:justify-end w-full">
        <div
          dir="rtl"
          className="flex items-center bg-white rounded-full p-2 shadow-lg w-full max-w-md"
        >
          <input
            type="email"
            placeholder={t("footer.newsLetterSection.placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 text-gray-700 bg-transparent focus:outline-none text-sm md:text-base"
          />
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="bg-gradient-to-r from-[#A436F0] via-[#637FEA] to-[#A436F0] text-white px-4 md:px-6 py-2 rounded-full flex items-center gap-2 -mr-14"
          >
            {isLoading
              ? t("footer.newsLetterSection.buttonLoading")
              : t("footer.newsLetterSection.button")}
            <FaArrowLeft className="text-sm text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
