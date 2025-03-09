/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  
  images: {
    domains: ["sci.com.sa"],
  },
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "ar",
    localeDetection: false,
  },
};

export default nextConfig;