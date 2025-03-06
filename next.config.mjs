import { i18n } from "./next-i18next.config.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["sci.com.sa"],
  },
  i18n, // Add i18n settings
};

export default nextConfig; // Use ES Modules export
