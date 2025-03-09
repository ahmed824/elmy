"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function GreetingHeader() {
  const { t } = useTranslation();
  return (
    <div className="mt-10">
      <h1 className="text-lg my-2 font-semibold">
        {t("dashboard.greetingSection.greeting")}
        <span className="mx-1">user</span>
      </h1>
      <p className="text-gray-500 text-sm">
        {t("dashboard.greetingSection.message")}
        <Link href={""} className="text-blue-700">
          {t("dashboard.greetingSection.link")}
        </Link>
      </p>
    </div>
  );
}
