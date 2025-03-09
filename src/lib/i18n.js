"use client"; // Important for Next.js App Router

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // Allows loading translation files dynamically
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Initializes React bindings
  .init({
    supportedLngs: ["en", "ar"], // Supported languages
    fallbackLng: "ar", // Default language if not detected
    lng: "ar", // Ensure a default language is set
    detection: {
      order: ["localStorage", "cookie", "navigator"], // Detect language from browser or storage
      caches: ["localStorage", "cookie"], // Cache the detected language
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Ensure this matches your folder structure
    },
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false, // This is optional and can be set to false if you don't want to use suspense
    },
    debug: true, // Set to false in production
  });

export default i18n;
